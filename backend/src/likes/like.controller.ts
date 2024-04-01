import { ZodError } from "zod";
import { SessionService, sessionService } from "../session/session.service";
import { LikeService, likeService } from "./likes.service";
import { ControllerError } from "../utils/transform-response";
import { GetLikeSchema, SetLikeSchema } from "./likes.validation";
import { validateRequest } from "../utils/validate-request";

export class LikeController {
  constructor(
    private readonly likeService: LikeService,
    private readonly sessionService: SessionService
  ) {}

  async setLike(request: unknown) {
    const { sessionId, name, userId, like } = validateRequest(
      SetLikeSchema,
      request
    );

    const session = await this.sessionService.getSessionById(sessionId);

    if (!session || session instanceof ZodError) {
      throw new ControllerError(400, "Session not found");
    }

    await this.likeService.setLike(
      { id: sessionId, requesterId: session.requesterId },
      like,
      userId,
      name
    );

    const likeList = await this.likeService.getLikeList(sessionId);

    return likeList;
  }

  async getLike(request: unknown) {
    const { sessionId } = validateRequest(GetLikeSchema, request);

    const likeList = await likeService.getLikeList(sessionId);

    return likeList;
  }
}

export const likeController = new LikeController(likeService, sessionService);
