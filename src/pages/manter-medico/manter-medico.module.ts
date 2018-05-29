import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManterMedicoPage } from './manter-medico';

@NgModule({
  declarations: [
    ManterMedicoPage,
  ],
  imports: [
    IonicPageModule.forChild(ManterMedicoPage),
  ],
})
export class ManterMedicoPageModule {}
