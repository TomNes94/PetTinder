import { createLogger } from "./logger";

export class ControllerError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export interface ControllerResponse {
  statusCode: number;
  data: unknown;
}

export type TransformedResponse = {
  statusCode: number;
  body: string;
};

const logger = createLogger("transformResponse");

export async function transformResponse<
  C extends (...args: unknown[]) => Promise<null | object>
>(originalMethod: C): Promise<TransformedResponse> {
  try {
    const result = await originalMethod();

    logger.info(JSON.stringify(result));

    return {
      body: JSON.stringify(result),
      statusCode: 200,
    };
  } catch (error) {
    logger.error(error);
    if (error instanceof ControllerError) {
      return {
        statusCode: error.statusCode,
        body: error.message,
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
}
