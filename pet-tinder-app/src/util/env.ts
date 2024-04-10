import { z } from "zod";

const EnvironmentSchema = z.object({
  baseUrl: z.string(),
});

export const env = EnvironmentSchema.parse({
  baseUrl: process.env.EXPO_PUBLIC_BASE_URL,
});
