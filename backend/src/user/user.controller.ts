import { nanoid } from "nanoid";
import { SessionService, sessionService } from "../session/session.service";
import { UserService, userService } from "./user.service";
import { CreateUserSchema } from "./user.validation";
import { ZodError } from "zod";
import { validateRequest } from "../utils/validate-request";

export class UserController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService
  ) {}

  async createUser(request: unknown) {
    const { sessionId, name } = validateRequest(CreateUserSchema, request);

    const user = {
      name,
      sessionId,
      id: nanoid(10),
    };

    await this.userService.createUser({
      id: user.id,
      name: user.name,
    });

    const session = await this.sessionService.getSessionById(user.sessionId);

    if (!session || session instanceof ZodError) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "session_not_found",
        }),
      };
    }

    await this.sessionService.addUserToSession(user.id, session);

    return {
      name: user.name,
      id: user.id,
    };
  }
}

export const userController = new UserController(sessionService, userService);
