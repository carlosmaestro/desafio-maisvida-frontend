import { ToastController } from "ionic-angular";
import { Injectable } from "@angular/core";


@Injectable()
export class ToastProvider {
  constructor(public toastCtrl: ToastController) {}

  show(message: string, position?: string, duration?: number) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration ? duration : 3000,
      position: position ? position : 'bottom'
    });
    toast.present();
  }
}
