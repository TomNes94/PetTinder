import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { nanoid } from "nanoid";
import {
  getSessionByCode,
  getSessionById,
} from "../services/sessions/getSession";
import { getUser } from "../services/users/getUser";
import { PostCodeSchema } from "../validation/postCode";
import { createSession } from "../services/sessions/createSession";

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

  const postCodeBody = PostCodeSchema.safeParse(event.body);

  if (!postCodeBody.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: postCodeBody.error,
      }),
    };
  }

  const session = {
    code: postCodeBody.data.code,
    gender: postCodeBody.data.gender,
    animalType: postCodeBody.data.animalType,
    id: nanoid(10),
  };

  await createSession(session);

  return {
    statusCode: 200,
    body: JSON.stringify(session),
  };
};

export const getSessionByCodeHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const params = event.pathParameters;

  if (!params || !params.code) {
    return { statusCode: 400, body: '{"error": "code missing"}' };
  }

  const session = await getSessionByCode(params.code);

  if (!session) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "no session",
      }),
    };
  }

  const addressee = session.addresseeId
    ? await getUser(session.addresseeId)
    : null;
  const requester = session.requesterId
    ? await getUser(session.requesterId)
    : null;

  const response = { users: { requester, addressee }, ...session };

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export const getSessionByIdHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const params = event.pathParameters;

  if (!params || !params.id) {
    return { statusCode: 400, body: '{"error": "id missing"}' };
  }

  const session = await getSessionById(params.id);

  if (!session) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "no session",
      }),
    };
  }

  const addressee = session.addresseeId
    ? await getUser(session.addresseeId)
    : null;
  const requester = session.requesterId
    ? await getUser(session.requesterId)
    : null;

  const response = { users: { requester, addressee }, ...session };

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
