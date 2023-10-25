import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { query } from "../storage/query";
import { upsert } from "../storage/put";
import { z } from "zod";
import { getLikeList } from "../common/getLikeList";

const SetLikeSchema = z.object({
  sessionId: z.string(),
  name: z.string(),
  userId: z.string(),
  like: z.boolean(),
});

export const setLikeHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = event.body;

  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "body missing",
      }),
    };
  }

  const setLike = SetLikeSchema.safeParse(JSON.parse(body));

  if (!setLike.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Invalid request",
      }),
    };
  }

  const { sessionId, name, userId, like } = setLike.data;

  const sessionQuery = await query({
    TableName: "Session",
    KeyConditionExpression: "Id = :sessionId AND #t=:t",
    ExpressionAttributeValues: {
      ":sessionId": {
        S: sessionId,
      },
      ":t": {
        S: "Session",
      },
    },
    ExpressionAttributeNames: {
      "#t": "Type",
    },
    Limit: 1,
  });

  const session = sessionQuery.Items?.[0];
  if (!session) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Session not found",
      }),
    };
  }

  const isRequester = session.RequesterId?.S === userId;
  const Like = isRequester
    ? {
        RequesterLike: {
          BOOL: like,
        },
      }
    : {
        AddresseeLike: {
          BOOL: like,
        },
      };

  await upsert({
    table: "Session",
    key: {
      Id: {
        S: sessionId,
      },
      Type: {
        S: "Like",
      },
    },
    expressionAttributeNames: { "#n": "Name" },
    expressionAttributeValues: {
      ":n": { S: name },
      ":l": {
        BOOL: Like.RequesterLike
          ? Like.RequesterLike.BOOL
          : Like.AddresseeLike.BOOL,
      },
    },
    updateExpression: `SET ${
      isRequester ? "RequesterLike" : "AddresseeLike"
    } = :l, #n = :n`,
  });

  const likeList = await getLikeList(sessionId);

  return {
    statusCode: 200,
    body: JSON.stringify(likeList),
  };
};

export const getLikeHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const params = event.pathParameters;

  if (!params || !params.sessionId) {
    return { statusCode: 400, body: '{"error": "sessionId missing"}' };
  }

  const likeList = await getLikeList(params.sessionId);

  return {
    statusCode: 200,
    body: JSON.stringify(likeList),
  };
};
