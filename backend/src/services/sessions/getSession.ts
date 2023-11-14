import { Session, SessionSchema } from "../../models/session";
import { query } from "../../storage/query";

export const getSessionByCode = async (
  code: string
): Promise<Session | null> => {
  const sessionQuery = await query({
    TableName: "Session",
    IndexName: "CodeIndex",
    KeyConditionExpression: "Code = :code",
    ExpressionAttributeValues: {
      ":code": {
        S: code,
      },
    },
    Limit: 1,
  });

  const parseResult = SessionSchema.safeParse(sessionQuery.Items?.[0]);

  if (!parseResult.success) {
    return null;
  }

  return parseResult.data;
};
export const getSessionById = async (id: string): Promise<Session | null> => {
  const sessionQuery = await query({
    TableName: "Session",
    KeyConditionExpression: "Id = :id AND #t=:t",
    ExpressionAttributeValues: {
      ":id": {
        S: id,
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

  const parseResult = SessionSchema.safeParse(sessionQuery.Items?.[0]);

  if (!parseResult.success) {
    return null;
  }

  return parseResult.data;
};
