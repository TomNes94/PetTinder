import { put } from "../../storage/put";

export const setLike = async (
  session: { id: string; requesterId: string | null },
  like: boolean,
  userId: string,
  name: string
) => {
  const isRequester = session.requesterId === userId;
  const Like = isRequester
    ? {
        RequesterLike: {
          BOOL: like,
        },
      }
    : {
        AddresseeLike: {
          BOOL: like,
        },
      };

  await put({
    table: "Session",
    key: {
      Id: {
        S: session.id,
      },
      Type: {
        S: "Like",
      },
    },
    expressionAttributeNames: { "#n": "Name" },
    expressionAttributeValues: {
      ":n": { S: name },
      ":l": {
        BOOL: Like.RequesterLike
          ? Like.RequesterLike.BOOL
          : Like.AddresseeLike.BOOL,
      },
    },
    updateExpression: `SET ${
      isRequester ? "RequesterLike" : "AddresseeLike"
    } = :l, #n = :n`,
  });
};
