import pino from "pino";
import pretty from "pino-pretty";

const stream = pretty({
  colorize: true,
  translateTime: "SYS:standard",
  ignore: "pid,hostname",
  levelFirst: true,
});
const logger = pino({}, stream);

export function createLogger(functionName: string) {
  return logger.child({ functionName });
}
