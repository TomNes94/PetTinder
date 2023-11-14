import { z } from "zod";

export const PostCodeSchema = z.object({
  gender: z.string(),
  animalType: z.string(),
  code: z.string(),
});
