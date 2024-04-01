import { LikeRepository, likeRepository } from "./likes.repository";

export class LikeService {
  constructor(private readonly repository: LikeRepository) {}

  async getLikeList(sessionId: string) {
    return this.repository.getLikeList(sessionId);
  }

  async setLike(
    session: { id: string; requesterId: string | null },
    like: boolean,
    userId: string,
    name: string
  ) {
    return this.repository.setLike(session, like, userId, name);
  }
}

export const likeService = new LikeService(likeRepository);
