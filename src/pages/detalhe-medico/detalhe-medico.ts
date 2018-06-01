import { ManterMedicoPageMode } from './../manter-medico/manter-medico';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ManterMedicoPage } from '../manter-medico/manter-medico';
import { Medico } from '../../models/medico';

@IonicPage()
@Component({
  selector: 'page-detalhe-medico',
  templateUrl: 'detalhe-medico.html',
})
export class DetalheMedicoPage {
  medico: Medico;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.medico = navParams.get("medico");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalheMedicoPage');
  }

  editMedico(){
    //copia se referencia
    let _medico = Object.assign({}, this.medico);
    this.navCtrl.push(ManterMedicoPage, { page_mode: ManterMedicoPageMode.Edit, medico: _medico});
  }
}
