import { UserSchema } from "./user";
import { UserRepository, userRepository } from "./user.repository";

interface CreateUserPayload {
  id: string;
  name: string;
}

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async getUserById(id: string) {
    const userQuery = await this.repository.getUserById(id);

    const parseResult = UserSchema.safeParse(userQuery);

    if (!parseResult.success) {
      return parseResult.error;
    }

    const {
      Name: { S: name },
    } = parseResult.data;

    return {
      id,
      name,
    };
  }

  async createUser(createUserPayload: CreateUserPayload) {
    await this.repository.createUser(createUserPayload);
  }
}

export const userService = new UserService(userRepository);
