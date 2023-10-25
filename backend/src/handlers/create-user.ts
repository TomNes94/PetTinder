import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { upsert } from "../storage/put";
import { nanoid } from "nanoid";
import { query } from "../storage/query";

export const createUserHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "payload_missing",
      }),
    };
  }

  const body = JSON.parse(event.body);

  const user = {
    Name: {
      S: body.name,
    },
    Id: {
      S: body.sessionId,
    },
    UserId: {
      S: nanoid(10),
    },
  };

  await upsert({
    table: "Session",
    expressionAttributeValues: { ":val": user.Name, ":id": user.UserId },
    key: { Id: { S: body.sessionId }, Type: { S: "User" } },
    updateExpression: `SET #n=:val, #id=:id`,
    expressionAttributeNames: { "#n": "Name", "#id": "UserId" },
  });

  const test = await upsert({
    table: "Session",
    expressionAttributeValues: { ":val": user.UserId },
    key: { Id: { S: body.sessionId }, Type: { S: "Session" } },
    updateExpression: `SET #n=:val`,
    expressionAttributeNames: { "#n": "RequesterId" },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      name: body.name,
      id: user.UserId.S,
    }),
  };
};

export const acceptInviteHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "payload_missing",
      }),
    };
  }

  const body = JSON.parse(event.body);

  const user = {
    Name: {
      S: body.name,
    },
    Code: {
      S: body.code,
    },
    UserId: {
      S: nanoid(10),
    },
  };

  const sessionQuery = await query({
    TableName: "Session",
    IndexName: "CodeIndex",
    KeyConditionExpression: "Code = :code",
    ExpressionAttributeValues: {
      ":code": {
        S: body.code,
      },
    },
    Limit: 1,
  });

  const session = sessionQuery.Items?.[0];

  if (!session) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: "session_does_not_exist",
      }),
    };
  }

  await upsert({
    table: "Session",
    expressionAttributeValues: { ":val": user.Name, ":id": user.UserId },
    key: { Id: session.Id, Type: { S: "User" } },
    updateExpression: `SET #n=:val, #id=:id`,
    expressionAttributeNames: { "#n": "Name", "#id": "UserId" },
  });

  await upsert({
    table: "Session",
    expressionAttributeValues: { ":val": user.UserId },
    key: { Id: session.Id, Type: { S: "Session" } },
    updateExpression: `SET #n=:val`,
    expressionAttributeNames: { "#n": "AddresseeId" },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      name: body.name,
      id: user.UserId.S,
    }),
  };
};
