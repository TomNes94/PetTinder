import client from "./base";

export type ListOfLikes = {
  addresseeLike?: boolean;
  requesterLike?: boolean;
  name: string;
}[];

export const getLikesForSession = async (sessionId: string) => await client.get<ListOfLikes>(`/likes/${sessionId}`);

interface PostLikePayload {
  sessionId: string;
  name: string;
  userId: string;
  like: boolean;
}

export const postLike = async (payload: PostLikePayload) => await client.post<ListOfLikes>("/likes", payload);
