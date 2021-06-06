import { createLogger, format, transports } from 'winston';

const logInInfoFile = format(log => {
  if (log['httpReq']) {
    return log;
  }
  return false;
});

const logger = createLogger({
  level: 'error',
  format: format.combine(format.uncolorize(), format.json()),
  transports: [
    new transports.File({
      filename: './logs/error.log',
    }),
    new transports.File({
      level: 'info',
      filename: './logs/info.log',
      format: format.combine(format.uncolorize(), format.json(), logInInfoFile()),
    }),
  ],
});

export default logger;
