import { GlobalProvider } from './../global/global';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';

@Injectable()
export class CidadeProvider {

  path: string = ""

  constructor(
    public global: GlobalProvider,
    private httpProvider: HttpProvider
  ) {
    this.path = this.global.ENV.PATHS.cidade;
  }

  filterByEstado(estado: string) {
    let _path = `${this.path}/estado/${estado}`;
    return this.httpProvider.get(_path);
  }
}
