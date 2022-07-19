import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
//pass the subject(informations of that user "id,name") in the session
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    //if you want keep just the name of the user
    //done(null, { id: user.id });
    // if you want keep all informations of that user
    done(null, user); //get information
  }
  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): any {
    done(null, payload); //getting back the informations
  }
}
