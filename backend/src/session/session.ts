import { z } from "zod";

export const SessionSchema = z.object({
  Id: z.object({ S: z.string() }),
  Gender: z.object({ S: z.string() }),
  Code: z.object({ S: z.string() }),
  AnimalType: z.object({ S: z.string() }),
  RequesterId: z.object({ S: z.string() }).optional(),
  AddresseeId: z.object({ S: z.string() }).optional(),
});

export type Session = {
  id: string;
  gender: string;
  code: string;
  animalType: string;
  requesterId: string | null;
  addresseeId: string | null;
};
