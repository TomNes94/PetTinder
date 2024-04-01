import { Session, SessionSchema } from "./session";
import { SessionRepository, sessionRepository } from "./session.repository";

interface CreateSessionPayload {
  id: string;
  code: string;
  animalType: string;
  gender: string;
}

export class SessionService {
  constructor(private readonly repository: SessionRepository) {}

  async getSessionByCode(code: string) {
    const sessionQuery = await this.repository.getSessionByCode(code);

    const parseResult = SessionSchema.safeParse(sessionQuery);

    if (!parseResult.success) {
      return parseResult.error;
    }

    const {
      AnimalType: { S: animalType },
      Gender: { S: gender },
      Id: { S: id },
      RequesterId,
      AddresseeId,
    } = parseResult.data;

    return {
      id,
      gender,
      code,
      requesterId: RequesterId?.S ?? null,
      addresseeId: AddresseeId?.S ?? null,
      animalType,
    };
  }

  async getSessionById(id: string) {
    const sessionQuery = await this.repository.getSessionById(id);

    const parseResult = SessionSchema.safeParse(sessionQuery);

    if (!parseResult.success) {
      return parseResult.error;
    }

    const {
      AnimalType: { S: animalType },
      Gender: { S: gender },
      Code: { S: code },
      RequesterId,
      AddresseeId,
    } = parseResult.data;

    return {
      id,
      gender,
      code,
      requesterId: RequesterId?.S ?? null,
      addresseeId: AddresseeId?.S ?? null,
      animalType,
    };
  }

  async addUserToSession(userId: string, session: Session) {
    const isRequester = !session.requesterId;
    return this.repository.addUserToSession(userId, session.id, isRequester);
  }

  async createSession(session: CreateSessionPayload) {
    await this.repository.createSession(session);
  }
}

export const sessionService = new SessionService(sessionRepository);
