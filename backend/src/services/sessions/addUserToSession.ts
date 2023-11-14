import { Session } from "../../models/session";
import { put } from "../../storage/put";

export const addUserToSession = async (
  userId: string,
  sessionId: string,
  session: Session
) => {
  const isRequester = !session.requesterId;

  await put({
    table: "Session",
    key: { Id: { S: sessionId }, Type: { S: "Session" } },
    expressionAttributeValues: {
      ":r": { S: userId },
    },
    updateExpression: "SET #r=:r",
    expressionAttributeNames: {
      "#r": isRequester ? "RequesterId" : "AddresseeId",
    },
  });
};
