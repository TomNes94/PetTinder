import { put } from "../../storage/put";

export const createUser = async (name: string, userId: string) => {
  await put({
    table: "Session",
    expressionAttributeValues: { ":val": { S: name } },
    key: { Id: { S: userId }, Type: { S: "User" } },
    updateExpression: `SET #n=:val`,
    expressionAttributeNames: { "#n": "Name" },
  });
};
