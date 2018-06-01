import { Medico } from './../../models/medico';
import { GlobalProvider } from './../global/global';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class MedicoProvider {

  path: string = ""

  constructor(
    public global: GlobalProvider,
    private httpProvider: HttpProvider
  ) {
    this.path = this.global.ENV.PATHS.medico;
  }

  list() {
    return this.httpProvider.get(this.path);
  }

  create(objMedico: any) {
    return this.httpProvider.post(this.path, objMedico);
  }

  update(objMedico: any, idMedico: String) {
    let _path = `${this.path}/${idMedico}`
    return this.httpProvider.put(_path, objMedico);
  }
}
