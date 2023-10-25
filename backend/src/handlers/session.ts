import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { upsert } from "../storage/put";
import { nanoid } from "nanoid";
import { query } from "../storage/query";
import { error } from "console";

type ListOfLikes = {
  adresseeLike?: boolean;
  requesterLike?: boolean;
  name: string;
}[];

export const postCodeHandler = async (
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

  const item = {
    Code: {
      S: body.code,
    },
    Id: {
      S: nanoid(10),
    },
  };
  console.log({
    table: "Session",
    key: { Id: item.Id, Type: { S: "Session" } },
    expressionAttributeValues: {
      ":val": item.Code,
      ":at": { S: body.animalType },
      ":g": { S: body.gender },
    },
    updateExpression: `SET #c=:val, `,
    expressionAttributeNames: {
      "#c": "Code",
      "#at": "AnimalType",
      "#g": "Gender",
    },
  });
  await upsert({
    table: "Session",
    key: { Id: item.Id, Type: { S: "Session" } },
    expressionAttributeValues: {
      ":val": item.Code,
      ":at": { S: body.animalType },
      ":g": { S: body.gender },
    },
    updateExpression: `SET #c=:val, `,
    expressionAttributeNames: {
      "#c": "Code",
      "#at": "AnimalType",
      "#g": "Gender",
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      code: body.code,
      id: item.Id.S,
      gender: body.gender,
      animalType: body.animalType,
    }),
  };
};

export const getSessionHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const params = event.pathParameters;

  if (!params || !params.sessionId) {
    return { statusCode: 400, body: '{"error": "sessionId missing"}' };
  }

  const res = await query({
    ExpressionAttributeValues: {
      ":id": {
        S: params.sessionId,
      },
    },
    KeyConditionExpression: "Id = :id",
    TableName: "Session",
  });

  const response = {} as {
    id: string;
    code: string;
    users: {
      requester: { name: string; id: string };
      addressee?: { name: string; id: string };
    };
    likes: ListOfLikes;
  };

  const session = res.Items?.find((item) => item.Type.S === "Session");

  if (!session) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "no session",
      }),
    };
  }

  response.id = session.Id.S ?? "";
  response.code = session.Code.S ?? "";

  res.Items?.forEach((item) => {
    if (item.Type.S === "User") {
      if (item.Id.S === session.RequesterId.S) {
        response.users.requester = {
          name: item.Name.S ?? "",
          id: item.Id.S ?? "",
        };
      } else {
        response.users.addressee = {
          name: item.Name.S ?? "",
          id: item.Id.S ?? "",
        };
      }
    }
    if (item.Type.S === "Like") {
      response.likes.push({
        name: item.Name.S ?? "",
        adresseeLike: item.AddresseeLike.BOOL,
        requesterLike: item.RequesterLike.BOOL,
      });
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
