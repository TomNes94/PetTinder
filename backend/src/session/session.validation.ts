import { z } from "zod";

export const PostCodeSchema = z.object({
  gender: z.string(),
  animalType: z.string(),
  code: z.string(),
});

export const GetSessionByCodeSchema = z.object({
  code: z.string(),
});

export const GetSessionByIdSchema = z.object({
  id: z.string(),
});
