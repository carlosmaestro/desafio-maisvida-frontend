import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'

import * as ENV from '../../config/enviroment';

import { ToastProvider } from '../toast/toast';
import { LoadingProvider } from '../loading/loading';

import { SessionData } from '../../models/session';

@Injectable()
export class GlobalProvider {

  ENV = ENV;

  session_status: {
    logged: boolean;
    token?: string;
  } = {
      logged: false
    };

  session_data: SessionData

  data: {
    translate: any;
  } = {
      translate: null
    };

  selected_client: string = "cliente";

  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastProvider,
    public actionSheetCtrl: ActionSheetController
  ) { }
}
