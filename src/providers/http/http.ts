import { UserCredentials } from './../../models/credentials';
import { Events } from "ionic-angular";
import { Injectable } from "@angular/core";
import { Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import { map } from 'rxjs/operators';


import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../global/global';
import { Session } from "../../models/session";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpProvider {
  constructor(
    private http: HttpClient,
    public events: Events,
    public global: GlobalProvider,
  ) { }

  //retorna o token a
  getToken() {
    return new Promise((resolve, reject) => {
      this.global.storage
        .get(this.global.ENV.SESSION_DATA_STORAGE_PATH)
        .then(data => {
          if (data) {
            let sessionData = <Session>data;
            resolve(sessionData.token);
          } else {
            reject({
              status: 400,
              code: 400,
              message: "Token não encontrado",
              action: "console"
            });
          }
        })
        .catch(reject);
    });
  }

  //retorna os header a serem utilizados na requisição
  headers(params: { public_route: boolean }) {
    return new Promise((resolve, reject) => {
      if (!params.public_route) {
        this.getToken()
          .then(token => {
            let headersParams = {
              "Content-Type": "application/json",
              "Authorization": token
            };
            let headers = new Headers(headersParams);
            let options = new RequestOptions({ headers: headers });
            resolve(options);
          })
          .catch(reject);
      } else {
        let headersParams = { "Content-Type": "application/json" };
        let headers = new Headers(headersParams);
        let options = new RequestOptions({ headers: headers });
        resolve(options);
      }
    });
  }

  //metodo post para validar credenciais
  validateCredentials(
    path: string,
    credentials: UserCredentials
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      this.headers({
        public_route: true
      })
        .then(data => {
          let headers = data;
          let url = `${this.global.ENV.API_URL}/login`;
          return this.http
            .post(url, credentials, {
              observe: 'response',
            }).subscribe((resp) => {
              resolve(resp.headers.get("Authorization"));
            },
              reject);
        })
        .catch(reject);
    });
  }

  // checkToken() {
  //   return new Promise((resolve, reject) => {
  //     this.headers({ token: true })
  //       .then(data => {
  //         let headers = data;
  //         let url = `${this.global.ENV.API_URL}/login`;
  //         return this.http
  //           .get(url, headers)
  //           .map(res => res.json())
  //           .toPromise()
  //           .then(data => resolve(data))
  //           .catch(err => reject(err));
  //       })
  //       .catch(reject);
  //   });
  // }


  post(path: string, body: any, public_route = false) {
    return new Promise((resolve, reject) => {
      this.headers({ public_route: public_route })
        .then(data => {
          let headers = data;
          let url = `${this.global.ENV.API_URL}/${path}`;
          return this.http
            .post(url, body, headers).subscribe((resp) => {
              resolve(resp);
            },
              reject);
        })
        .catch(reject);
    });
  }

  //http put verb
  put(path: string, body: any, public_route = false) {
    return new Promise((resolve, reject) => {
      this.headers({ public_route: public_route })
        .then(data => {
          let headers = data;
          let url = `${this.global.ENV.API_URL}/${path}`;
          return this.http
            .put(url, body, headers).subscribe((resp) => {
              resolve(resp);
            },
              reject);
        })
        .catch(reject);
    });
  }


  // //http get verb
  get(path: string, public_route = false) {
    return new Promise((resolve, reject) => {
      this.headers({ public_route: public_route })
        .then(data => {
          let headers = data;
          let url = `${this.global.ENV.API_URL}/${path}`;
          return this.http
            .get(url, headers).subscribe((resp) => {
              resolve(resp);
            },
              reject);
        })
        .catch(reject);
    });
  }

  // delete(path: string, public_route = false) {
  //   return new Promise((resolve, reject) => {
  //     this.headers({ public_route: public_route })
  //       .then(data => {
  //         let headers = data;
  //         let url = `${this.global.ENV.API_URL}/${path}`;
  //         return this.http
  //           .delete(url, headers)
  //           .map(res => res.json())
  //           .toPromise()
  //           .then(data => resolve(data))
  //           .catch(err => reject(err));
  //       })
  //       .catch(reject);
  //   });
  // }

  invalidToken() {
    this.events.publish("token:invalid");
  }

  //ação comum a erros que vierem de requisições
  processarErros(erro: any) {
    // console.log('Erro acessando servidor remoto.');
    return Observable.throw("Erro acessando servidor remoto.");
  }
}
