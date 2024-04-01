import { z } from "zod";

export const SetLikeSchema = z.object({
  sessionId: z.string(),
  name: z.string(),
  userId: z.string(),
  like: z.boolean(),
});

export type SetLikeParams = z.infer<typeof SetLikeSchema>;

export const GetLikeSchema = z.object({
  sessionId: z.string(),
});

export type GetLikeParams = z.infer<typeof GetLikeSchema>;
