import { Injectable, Logger } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  private logger: Logger = new Logger('SessionSerializer');

  serializeUser(user: any, done: (err: Error, id?: any) => void): any {
    this.logger.log(`serializeUser ${user}`);
    done(null, user);
  }

  deserializeUser(payload: any, done: (err: Error, user?: any) => void): any {
    this.logger.log(`deserializeUser ${payload}`);
    done(null, payload);
  }
}
