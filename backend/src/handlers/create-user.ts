import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { nanoid } from "nanoid";
import { getSessionById } from "../services/sessions/getSession";
import { CreateUserSchema } from "../validation/createUser";
import { createUser } from "../services/users/createUser";
import { addUserToSession } from "../services/sessions/addUserToSession";

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

  const createUserBody = CreateUserSchema.safeParse(event.body);

  if (!createUserBody.success) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: createUserBody.error,
      }),
    };
  }

  const user = {
    name: createUserBody.data.name,
    sessionId: createUserBody.data.sessionId,
    id: nanoid(10),
  };

  await createUser(user.name, user.id);

  const session = await getSessionById(user.sessionId);

  if (!session) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: "session_not_found",
      }),
    };
  }

  await addUserToSession(user.id, user.sessionId, session);

  return {
    statusCode: 200,
    body: JSON.stringify({
      name: user.name,
      id: user.id,
    }),
  };
};
