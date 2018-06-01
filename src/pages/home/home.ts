import { ManterMedicoPage, ManterMedicoPageMode } from './../manter-medico/manter-medico';
import { DetalheMedicoPage } from './../detalhe-medico/detalhe-medico';
import { GlobalProvider } from './../../providers/global/global';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MedicoProvider } from '../../providers/medico/medico';
import { Medico } from '../../models/medico';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  medicos: Medico[];
  constructor(
    public navCtrl: NavController,
    public medicoProvider: MedicoProvider,
    public global: GlobalProvider
  ) {

  }

  ngOnInit() {
    this.global.loadingCtrl.show();
    this.medicoProvider.list().then(
      data => {
        this.global.loadingCtrl.hide();
        console.log(data);
        this.medicos = <Medico[]>data;
      }
    ).catch(err => {
      console.log(err);
      this.global.loadingCtrl.hide();
    })
  }


  detalheMedico(item) {
    this.navCtrl.push(DetalheMedicoPage, { medico: item });
  }

  newMedico() {
    this.navCtrl.push(ManterMedicoPage, { page_mode: ManterMedicoPageMode.Create })
  }
}
