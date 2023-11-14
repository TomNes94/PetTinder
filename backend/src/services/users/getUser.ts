import { User, UserSchema } from "../../models/user";
import { query } from "../../storage/query";

export const getUser = async (id: string): Promise<User | null> => {
  const userQuery = await query({
    TableName: "Session",
    KeyConditionExpression: "#id=:id AND #t=:t",
    ExpressionAttributeValues: {
      ":id": {
        S: id,
      },
      ":t": {
        S: "User",
      },
    },
    ExpressionAttributeNames: {
      "#t": "Type",
      "#id": "Id",
    },
    Limit: 1,
  });

  const parseResult = UserSchema.safeParse(userQuery.Items?.[0]);

  if (!parseResult.success) {
    return null;
  }

  return parseResult.data;
};
