import { HttpProvider } from './../http/http';
import { GlobalProvider } from './../global/global';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class StatusProvider {


  path: string = ""

  constructor(
    public global: GlobalProvider,
    private httpProvider: HttpProvider
  ) {
    this.path = this.global.ENV.PATHS.status;
  }

  list() {
    return this.httpProvider.get(this.path);
  }
}

