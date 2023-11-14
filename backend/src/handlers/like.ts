import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getLikeList } from "../services/likes/getLikeList";
import { SetLikeSchema } from "../validation/setLike";
import { getSessionById } from "../services/sessions/getSession";
import { setLike } from "../services/likes/setLike";

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

  const setLikeBody = SetLikeSchema.safeParse(JSON.parse(body));

  if (!setLikeBody.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: setLikeBody.error,
      }),
    };
  }

  const { sessionId, name, userId, like } = setLikeBody.data;

  const session = await getSessionById(sessionId);

  if (!session) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Session not found",
      }),
    };
  }

  await setLike(
    { id: sessionId, requesterId: session.requesterId },
    like,
    userId,
    name
  );

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
