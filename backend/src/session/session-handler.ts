import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { sessionController } from "./session.controller";
import { transformResponse } from "../utils/transform-response";

export const postCodeHandler = async (
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
    sessionController.createSession(JSON.parse(body))
  );
};

export const getSessionByCodeHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const params = event.pathParameters;

  if (!params) {
    return { statusCode: 400, body: '{"error": "code missing"}' };
  }

  return await transformResponse(() =>
    sessionController.getSessionByCode(params)
  );
};

export const getSessionByIdHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const params = event.pathParameters;

  if (!params) {
    return { statusCode: 400, body: '{"error": "id missing"}' };
  }

  return await transformResponse(() =>
    sessionController.getSessionById(params)
  );
};
