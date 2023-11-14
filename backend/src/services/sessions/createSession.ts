import { put } from "../../storage/put";

export const createSession = async (session: {
  id: string;
  code: string;
  animalType: string;
  gender: string;
}) => {
  const { id, gender, animalType, code } = session;
  await put({
    table: "Session",
    key: { Id: { S: id }, Type: { S: "Session" } },
    expressionAttributeValues: {
      ":val": { S: code },
      ":at": { S: animalType },
      ":g": { S: gender },
    },
    updateExpression: "SET #c=:val, #at=:at, #g=:g",
    expressionAttributeNames: {
      "#c": "Code",
      "#at": "AnimalType",
      "#g": "Gender",
    },
  });
};
