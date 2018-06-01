import { LoginPage } from './../pages/login/login';
import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { GlobalProvider } from '../providers/global/global';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(
    private platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public global: GlobalProvider,
    public app: App, ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNav();
        if (nav.canGoBack()) {
          //Can we go back?
          nav.pop();
        } else {
          this.exitApp();
        }
      }, 99);
    });
  }

  exitApp() {


    let confirm = this.global.alertCtrl.create({
      title: "Deseja sair do aplicativo?",
      message: "",
      buttons: [
        {
          text: "Cancelar",
          handler: () => {
          }
        },
        {
          text: "Sair",
          handler: () => {
            this.platform.exitApp(); //Exit from app
          }
        }
      ]
    });
    confirm.present();
  }
}

