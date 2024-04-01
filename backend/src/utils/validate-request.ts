import { ZodSchema } from "zod";
import { ControllerError } from "./transform-response";

export const validateRequest = <T>(
  schema: ZodSchema<T>,
  request: unknown
): T => {
  const result = schema.safeParse(request);
  if (!result.success) {
    throw new ControllerError(400, result.error.message);
  }
  return result.data;
};
