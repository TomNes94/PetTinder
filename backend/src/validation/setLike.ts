import { z } from "zod";

export const SetLikeSchema = z.object({
  sessionId: z.string(),
  name: z.string(),
  userId: z.string(),
  like: z.boolean(),
});
