import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { likeController } from "./like.controller";
import { transformResponse } from "../utils/transform-response";

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

  return await transformResponse(() =>
    likeController.setLike(JSON.parse(body))
  );
};

export const getLikeHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const params = event.pathParameters;

  if (!params) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "body missing",
      }),
    };
  }

  return await transformResponse(() => likeController.getLike(params));
};
