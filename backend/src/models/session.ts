import { z } from "zod";

export const SessionSchema = z.object({
  id: z.string(),
  gender: z.string(),
  code: z.string(),
  animalTyped: z.string(),
  requesterId: z.string().nullable(),
  addresseeId: z.string().nullable(),
});

export type Session = z.infer<typeof SessionSchema>;
