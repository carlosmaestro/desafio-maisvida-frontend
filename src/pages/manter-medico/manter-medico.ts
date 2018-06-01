import { Medico } from './../../models/medico';
import { GlobalProvider } from './../../providers/global/global';
import { EstadoProvider } from './../../providers/estado/estado';
import { StatusProvider } from './../../providers/status/status';
import { Estado } from './../../models/estado';
import { Cidade } from './../../models/cidade';
import { Status } from './../../models/status';
import { Especialidade } from './../../models/especialidade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EspecialidadeProvider } from '../../providers/especialidade/especialidade';
import { CidadeProvider } from '../../providers/cidade/cidade';
import { MedicoProvider } from '../../providers/medico/medico';

export enum ManterMedicoPageMode {
  Create = "Create",
  Edit = "Edit"
};
@IonicPage()
@Component({
  selector: 'page-manter-medico',
  templateUrl: 'manter-medico.html',
})
export class ManterMedicoPage {
  page_title: "Novo Médico" | "Atualizar Médico" = "Novo Médico";
  form: FormGroup;

  especialidades: Especialidade[];
  status: Status[];
  cidades: Cidade[];
  estados: Estado[];


  showCidadeError: boolean = true;

  ready: boolean = false;

  medico: Medico;
  __param_medico: Medico;
  page_mode: ManterMedicoPageMode = ManterMedicoPageMode.Create;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public global: GlobalProvider,
    private especialidadeProvider: EspecialidadeProvider,
    private statusProvider: StatusProvider,
    private cidadeProvider: CidadeProvider,
    private estadoProvider: EstadoProvider,
    private medicoProvider: MedicoProvider,
    public formBuilder: FormBuilder,
  ) {
    this.medico = {
      id: null,
      first_name: null,
      last_name: null,
      email: null,
      ativo: true,
      especialidade: null,
      status: null,
      cidade: null
    };

    let page_mode = navParams.get("page_mode");
    if (page_mode) {
      this.page_mode = <ManterMedicoPageMode>page_mode;
      if (this.page_mode == ManterMedicoPageMode.Edit) {
        this.page_title = "Atualizar Médico";
        this.__param_medico = navParams.get("medico");
        let obj = Object.assign({}, this.__param_medico);
        // obj.cidade = obj.cidade["id"];
        obj.especialidade = obj.especialidade["id"];
        obj.status = obj.status["id"];
        this.medico = obj;
      }else{
        this.ready = true;
      }
    }

  }

  ngOnInit() {
    this.carregarListas();

    this.form = this.formBuilder.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, Validators.required],
      especialidade: [null, Validators.required],
      status: [null, Validators.required],
      cidade: [this.page_mode == ManterMedicoPageMode.Edit ? this.__param_medico.cidade["id"] : null, Validators.required],
      estado: [this.page_mode == ManterMedicoPageMode.Edit ? this.__param_medico.cidade["estado"]["id"] : null, Validators.required],
      ativo: [true, null],
    });
  }

  carregarListas() {
    this.global.loadingCtrl.show();
    Promise.all([
      this.especialidadeProvider.list(),
      this.estadoProvider.list(),
      this.statusProvider.list(),
    ]).then(results => {
      this.global.loadingCtrl.hide();

      this.especialidades = <Especialidade[]>results[0];
      this.estados = <Estado[]>results[1];
      this.status = <Status[]>results[2];

      if (this.page_mode == ManterMedicoPageMode.Edit) {
        this.onSelectEstado(this.__param_medico.cidade["estado"]["id"]);
      }
      console.log(results);
      

    }).catch(err => {
      this.global.loadingCtrl.hide();
      console.log(err);
      console.log("Erro ao popular listas.");
    });
  }

  onSubmit() {

    if (this.form.valid) {
      console.log(this.form.value);
      this.global.loadingCtrl.show();

      if (this.page_mode == ManterMedicoPageMode.Create) {
        this.medicoProvider.create(this.form.value).then(_ => {
          this.global.loadingCtrl.hide();
          this.global.toastCtrl.show("Médico criado com sucesso.");
          this.form.reset();
        }).catch(err => {
          this.global.loadingCtrl.hide();
          console.log(err);
          console.log("Erro ao salvar Médico.");
        });
      } else {
        this.medicoProvider.update(this.form.value, this.medico.id).then(_ => {
          this.global.loadingCtrl.hide();
          this.global.toastCtrl.show("Médico atualizado com sucesso.");
          this.form.reset();
        }).catch(err => {
          this.global.loadingCtrl.hide();
          console.log(err);
          console.log("Erro ao salvar Médico.");
        });
      }


    } else {
      this.verificaValidacoesForm(this.form);
    }
  }

  onSelectEstado(id_estado) {
    if (id_estado == undefined || id_estado == null){
      return;
    }
    // console.log(event);
    this.cidadeProvider.filterByEstado(id_estado)
      .then(data => {
        this.cidades = null;
        setTimeout(() => {
          this.showCidadeError = false;
          setTimeout(() => {
            this.medico.cidade = "";
            this.showCidadeError = true;
          }, 100);

        }, 100);

        this.cidades = <Cidade[]>data;
        if (this.page_mode == ManterMedicoPageMode.Edit && !this.ready) {
          this.medico.cidade = this.__param_medico.cidade["id"];
          this.ready = true;
        }
      }).catch(err => {
        this.global.loadingCtrl.hide();
        console.log(err);
        console.log("Erro ao popular listas.");
      });
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
