import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { transformResponse } from "../utils/transform-response";
import { userController } from "./user.controller";

export const createUserHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = event.body;
  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "payload_missing",
      }),
    };
  }

  return await transformResponse(() =>
    userController.createUser(JSON.parse(body))
  );
};
