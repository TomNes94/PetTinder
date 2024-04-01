import { z } from "zod";

export const UserSchema = z.object({
  Id: z.object({ S: z.string() }),
  Name: z.object({ S: z.string() }),
});

export type User = { id: string; name: string };
