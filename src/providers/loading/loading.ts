import { LoadingController, Loading } from "ionic-angular";
import { Injectable } from "@angular/core";

@Injectable()
export class LoadingProvider {
  isShowing: boolean = false;
  loading: Loading;
  constructor(public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: "",
      cssClass: "loadind-default"
    });
  }

  
  show() {
    if (!this.isShowing) {
      this.loading = this.loadingCtrl.create({
        content: '<img heigth="50px" width="50px" src="assets/imgs/load.gif" />',
        spinner: "hide",
        cssClass: "loadind-default"
      });
      this.isShowing = true;
      this.loading.present();
    }
  }
  
  hide() {
    if (this.isShowing) {
      this.isShowing = false;
      this.loading.dismiss();
    }
  }
}
