import client from './base';

export type ListOfLikes = {
  adresseeLike?: boolean;
  requesterLike?: boolean;
  name: string;
}[];

export const getLikesForSession = (sessionId: string) =>
  client.get<ListOfLikes>(`/likes/${sessionId}`);

type PostLikePayload = {
  sessionId: string;
  name: string;
  userId: string;
  like: boolean;
};

export const postLike = (payload: PostLikePayload) =>
  client.post<ListOfLikes>('/likes', payload);
