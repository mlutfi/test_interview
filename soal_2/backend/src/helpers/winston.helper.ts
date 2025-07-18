import winston, { format } from 'winston';
import moment from 'moment';
import 'winston-daily-rotate-file';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '1d',
});

const errorFileRotateTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/%DATE%.error.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '1d',
});

const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const transports = [
  new winston.transports.Console({
    format: format.combine(
      format.metadata(),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      format.colorize({ all: true }),
      format.printf(({ timestamp, level, message, metadata }) => {
        return `${timestamp} ${level}: ${message}. ${JSON.stringify(metadata)}`;
      })
    ),
  }),
  // fileRotateTransport,
  // errorFileRotateTransport,
  new winston.transports.File({
    filename: `logs/${moment().format('YYYY-MM-DD')}.error.log`,
    level: 'error',
    format: format.combine(
      format.metadata(),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      format.printf(({ timestamp, level, message, metadata }) => {
        return `${timestamp} ${level}: ${message}. ${JSON.stringify(metadata)}`;
      })
    ),
  }),
  new winston.transports.File({
    filename: `logs/${moment().format('YYYY-MM-DD')}.log`,
    format: format.combine(
      format.metadata(),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      format.printf(({ timestamp, level, message, metadata }) => {
        return `${timestamp} ${level}: ${message}. ${JSON.stringify(metadata)}`;
      })
    ),
  }),
];

const Logger = winston.createLogger({
  level: level(),
  levels,
  transports,
});

export default Logger;
