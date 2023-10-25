import { query } from "../storage/query";

export const getLikeList = async (sessionId: string) => {
  const queryResult = await query({
    ExpressionAttributeValues: {
      ":id": {
        S: sessionId,
      },
      ":t": {
        S: "Like",
      },
    },
    ExpressionAttributeNames: { "#t": "Type" },
    KeyConditionExpression: "Id = :id AND #t = :t",
    TableName: "Session",
  });

  return (queryResult.Items ?? []).map((like) => ({
    requesterLike: like.RequesterLike.BOOL,
    addresseeLike: like.AddresseeLike.BOOL,
    name: like.Name.S,
  }));
};
