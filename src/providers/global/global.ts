import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'

import * as ENV from '../../config/enviroment';

import { ToastProvider } from '../toast/toast';
import { LoadingProvider } from '../loading/loading';

import { Session } from '../../models/session';
import { Storage } from '@ionic/storage';

@Injectable()
export class GlobalProvider {

  ENV = ENV;

  session_status: {
    logged: boolean;
    token?: string;
  } = {
      logged: false
    };

  session_data: Session

  data: {
    translate: any;
  } = {
      translate: null
    };

  selected_client: string = "cliente";

  constructor(
    public storage: Storage,
    public loadingCtrl: LoadingProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastProvider,
    public actionSheetCtrl: ActionSheetController
  ) { }
}
