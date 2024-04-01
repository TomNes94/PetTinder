import { nanoid } from "nanoid";
import { ControllerError } from "../utils/transform-response";
import { SessionService, sessionService } from "./session.service";
import {
  PostCodeSchema,
  GetSessionByCodeSchema,
  GetSessionByIdSchema,
} from "./session.validation";
import { Session } from "./session";
import { ZodError } from "zod";
import { UserService, userService } from "../user/user.service";
import { validateRequest } from "../utils/validate-request";

export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService
  ) {}

  async createSession(request: unknown) {
    const { code, gender, animalType } = validateRequest(
      PostCodeSchema,
      request
    );

    const session: Session = {
      code,
      gender,
      animalType,
      id: nanoid(10),
      requesterId: null,
      addresseeId: null,
    };
    await this.sessionService.createSession(session);
    return session;
  }

  async getSessionByCode(request: unknown) {
    const { code } = validateRequest(GetSessionByCodeSchema, request);

    const session = await this.sessionService.getSessionByCode(code);

    if (!session || session instanceof ZodError) {
      throw new ControllerError(400, session.message);
    }

    const addressee = session.addresseeId
      ? await this.userService.getUserById(session.addresseeId)
      : null;
    const requester = session.requesterId
      ? await this.userService.getUserById(session.requesterId)
      : null;

    const response = { users: { requester, addressee }, ...session };

    return response;
  }

  async getSessionById(request: unknown) {
    const { id } = validateRequest(GetSessionByIdSchema, request);

    const session = await this.sessionService.getSessionById(id);

    if (!session || session instanceof ZodError) {
      throw new ControllerError(400, session.message);
    }

    const addressee = session.addresseeId
      ? await this.userService.getUserById(session.addresseeId)
      : null;
    const requester = session.requesterId
      ? await this.userService.getUserById(session.requesterId)
      : null;

    const response = { users: { requester, addressee }, ...session };

    return response;
  }
}

export const sessionController = new SessionController(
  sessionService,
  userService
);
