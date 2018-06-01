import { UserCredentials } from './../../models/credentials';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalProvider } from '../global/global';
import { HttpProvider } from '../http/http';
import { Session } from '../../models/session';


@Injectable()
export class LoginProvider {

  path: string = "";

  constructor(
    public global: GlobalProvider,
    private httpProvider: HttpProvider
  ) {
    this.path = this.global.ENV.PATHS.login;
  }

  validateCredentials(userCredentials: UserCredentials): Promise<Session> {
    return new Promise((resolve, reject) => {
      this.httpProvider.validateCredentials(
        this.path,
        userCredentials
      ).then(token => {
        let session: Session = {
          user: userCredentials.email,
          token:token
        }
        this.global.storage.set(this.global.ENV.SESSION_DATA_STORAGE_PATH, session)
        .then(resolve).catch(reject);
      }).catch(reject);
    });
  }
}
