import { format, transports } from 'winston';
import { utilities as nestWinstonUtilities } from 'nest-winston';

const { combine, printf, timestamp, ms } = format;

const formatOptions = {
  format: combine(
    process.env.NODE_ENV !== 'production' ? format.simple() : format.json(),

    printf(({ level, message }) => {
      const today = new Date();
      const timestamp = `${today.toISOString().split('T')[0]} ${today.toLocaleTimeString()}`;
      return `${timestamp} ${level}: ${message}`;
    }),
  ),
};

const options = {
  error: {
    level: 'error',
    filename: `${process.cwd()}/logs/error.log`,
    handleExceptions: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
  },
  combined: {
    level: 'info',
    filename: `${process.cwd()}/logs/app.log`,
    handleExceptions: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const winstonLogger = {
  ...formatOptions,
  transports: [
    new transports.Console({
      format: combine(
        timestamp(),
        ms(),
        nestWinstonUtilities.format.nestLike(),
      ),
      ...options.console,
    }),

    new transports.File(options.combined),
    new transports.File(options.error),
  ],
};

const exitLog = (error: Error | null, event: string): never => {
  let msg: string = '';

  if (error) {
    msg = `\n[!ERROR][${event}] => ${error}\n`;
    process.stdout.write(msg);
  } else {
    msg = `\n![${event}] EVENT CAUSE EXIT\n`;
    process.stdout.write(msg);
  }

  process.exit(error ? 1 : 0);
};

export { winstonLogger, exitLog };
