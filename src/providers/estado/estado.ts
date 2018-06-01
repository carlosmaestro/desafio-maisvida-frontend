import { GlobalProvider } from './../global/global';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';

@Injectable()
export class EstadoProvider {

  path: string = ""

  constructor(
    public global: GlobalProvider,
    private httpProvider: HttpProvider
  ) {
    this.path = this.global.ENV.PATHS.estado;
  }

  list() {
    return this.httpProvider.get(this.path);
  }
}
