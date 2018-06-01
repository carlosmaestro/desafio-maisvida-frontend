import { GlobalProvider } from './../../providers/global/global';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'select-lang',
  templateUrl: 'select-lang.html'
})
export class SelectLangComponent {

  text: string;

  selected_lang: string = "pt_br";

  listLanguages = ["en", "es", "pt_br"];

  show_list: boolean = false;

  constructor(
    public translate: TranslateService,
    public global: GlobalProvider,
    private storage: Storage,
  ) {
    this.storage.get(this.global.ENV.LANG_STORAGE_PATH).then(
      data => {
        if (data) {
          this.selectLang(data, false);
        }else{
          this.selectLang("pt_br", false);
        }
      }
    );
    console.log('Hello SelectLangComponent Component');
    this.text = 'Hello World';
  }

  toggleList() {
    this.show_list = !this.show_list;
  }

  getSrcImg(lang) {
    return `./assets/imgs/${lang}.png`;
  }

  selectLang(lang, showLoading = true) {
    if (showLoading) {
      this.global.loadingCtrl.show();
    }
    this.selected_lang = lang;
    this.translate.setDefaultLang(lang);
    this.storage.set(this.global.ENV.LANG_STORAGE_PATH, lang).then(data => {

      this.translate.getTranslation(lang).subscribe(value => {
        this.global.data.translate = value;
        console.log(value);
      });

      this.global.loadingCtrl.hide();      
    }).catch(err => {
      console.log(err);
      this.global.loadingCtrl.hide();
    })
  }
}
