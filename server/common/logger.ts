import * as fs from 'fs';
import * as path from 'path';
import { Logger as WinstonLogger, createLogger, format, transports } from 'winston';
import { format as dateFormat } from 'date-fns';

export const TAB_IDENTATION = 4;

export const logDir = path.join(__dirname, '/.log');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const { combine, printf } = format;
const logFile = path.join(logDir, `/log.${dateFormat(new Date(), 'YYYYMMddHHmmss')}.txt`);

const rowFormat = printf(info => {
  return `${dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss.SSS')} [${info.level}]: ${info.message}`;
});

class Logger {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    private maxLoggerMessageLength = 2048;
    private logObject: WinstonLogger;
    public stream: any = null;

    constructor () {
      this.logObject = createLogger({
        format: combine(
          rowFormat
        ),
        transports: [
          new(transports.File)({ filename: logFile }),
          new(transports.Console)({ level: 'verbose' })
        ]
      });

      const self = this;
      this.stream = {
        write(message: any) {
          self.message(message);
        }
      };
    }

    public error (message: string | Record<any, any>, object: Record<any, any> | null = null): void {
      this.logObject.log('error', this.normalizeMessage(message, object));
    }

    public warning (message: string | Record<any, any>, object: Record<any, any> | null = null): void {
      this.logObject.log('warn', this.normalizeMessage(message, object));
    }

    public message (message: string | any, object: Record<any, any> | null = null): void {
      this.logObject.log('info', this.normalizeMessage(message, object));
    }

    public verbose (message: string | Record<any, any>, object: Record<any, any> | null = null): void {
      this.logObject.log('verbose', this.normalizeMessage(message, object));
    }

    public debug (message: string | Record<any, any>, object: Record<any, any> | null = null): void {
      this.logObject.log('debug', this.normalizeMessage(message, object));
    }

    public silly (message: string | Record<any, any>, object: Record<any, any> | null = null): void {
      this.logObject.log('silly', this.normalizeMessage(message, object));
    }

    private normalizeMessage(message: string | any, object: any): string {
      let stack = '';

      if (typeof message.stack === 'string') {
        stack = `\n${message.stack}`;
      }

      if (message.message) {
        return `${message.message}${stack}`;
      }

      let result = (typeof message === 'string' || message instanceof String)
        ? String(message)
        : JSON.stringify(message);

      try {
        if (object.message) {
          result = `${result} ${JSON.stringify(object.message, null, TAB_IDENTATION)}`;
        } else {
          result = `${result} ${JSON.stringify(object, null, TAB_IDENTATION)}`;
        }
      } catch (err) {
        // empty
      }

      if (result && result.length > this.maxLoggerMessageLength) {
        result = `${result.substr(0, this.maxLoggerMessageLength)} ...`;
      }
      return result;
    }
}

export const logger = new Logger();
