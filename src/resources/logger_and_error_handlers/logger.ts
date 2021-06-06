import { createLogger, format, transports } from 'winston';

const logInInfoFile = format(log => {
  if (log['httpReq']) {
    return log;
  }
  return false;
});

const viewFormat = format.printf(({ message, timestamp }) => `${timestamp}: ${message}`);

const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.uncolorize(),
    format.json(),
    viewFormat,
  ),
  transports: [
    new transports.File({
      filename: './logs/error.log',
    }),
    new transports.File({
      level: 'info',
      filename: './logs/info.log',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.uncolorize(),
        format.json(),
        logInInfoFile(),
        viewFormat,
      ),
    }),
  ],
});

export default logger;
