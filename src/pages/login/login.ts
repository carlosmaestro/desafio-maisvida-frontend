import { LoginProvider } from './../../providers/login/login';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserCredentials } from '../../models/credentials';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GlobalProvider } from '../../providers/global/global';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userCredentials: UserCredentials =
    {
      email: "",
      senha: ""
    };
  save_credentials: boolean = false;
  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public global: GlobalProvider,
    private loginProvider: LoginProvider
  ) {


  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      senha: [null, Validators.required],
    });

    this.global.storage.get(this.global.ENV.REMEMBERME_STORAGE_PATH).then(data => {
      if (data) {
        this.save_credentials = true;
        this.global.storage.get(this.global.ENV.USER_CRENDENTIASL_STORAGE_PATH).then(data => {
          if (data) {
            this.userCredentials = data;
          }
        }).catch(console.log);
      }
    }).catch(console.log);
  }

  toggleRemember(event) {
    if (!event.value) {
      this.global.storage.set(this.global.ENV.REMEMBERME_STORAGE_PATH, false);
      this.global.storage.set(this.global.ENV.USER_CRENDENTIASL_STORAGE_PATH, null);
    }
  }

  login() {

    if (this.form.valid) {
      this.global.loadingCtrl.show();

      this.loginProvider
        .validateCredentials(this.userCredentials)
        .then(data => {
          if (this.save_credentials) {
            this.global.storage.set(this.global.ENV.REMEMBERME_STORAGE_PATH, true);
            this.global.storage.set(this.global.ENV.USER_CRENDENTIASL_STORAGE_PATH, this.userCredentials);
          } else {
            this.global.storage.set(this.global.ENV.REMEMBERME_STORAGE_PATH, false);
            this.global.storage.set(this.global.ENV.USER_CRENDENTIASL_STORAGE_PATH, null);
          }

          this.global.loadingCtrl.hide();
          console.log(data);
          this.global.toastCtrl.show("Login efetuado com sucesso");
          this.navCtrl.setRoot(HomePage);
        })
        .catch(err => {
          this.global.loadingCtrl.hide();
          this.global.toastCtrl.show(err.error.message);
          console.log(err);
        });
    } else {
      this.verificaValidacoesForm(this.form);
    }

  }

  verificaValidTouched(campo: string) {
    return (
      !this.form.get(campo).valid &&
      (this.form.get(campo).touched || this.form.get(campo).dirty)
    );
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

}
