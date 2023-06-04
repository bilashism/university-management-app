import path from 'path';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, prettyPrint, printf } = format;

const logFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${date.toDateString()} ${hours}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});

const logFormatter = (lbl: string) =>
  combine(label({ label: lbl }), timestamp(), logFormat);

const infoLogger = createLogger({
  level: 'info',
  format: logFormatter('UMA'),

  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs/winston/info.log'),
      level: 'info',
    }),
  ],
});

const errorLogger = createLogger({
  level: 'error',
  format: logFormatter('UMA'),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs/winston/error.log'),
      level: 'error',
    }),
  ],
});

export { infoLogger, errorLogger };

