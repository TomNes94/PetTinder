import { z } from "zod";

export const CreateUserSchema = z.object({
  sessionId: z.string(),
  name: z.string(),
});
