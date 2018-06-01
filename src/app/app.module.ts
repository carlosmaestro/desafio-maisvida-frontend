import { ManterMedicoPage } from './../pages/manter-medico/manter-medico';
import { DetalheMedicoPage } from './../pages/detalhe-medico/detalhe-medico';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { LoadingProvider } from './../providers/loading/loading';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GlobalProvider } from '../providers/global/global';
import { CampoControlErroComponent } from '../components/campo-control-erro/campo-control-erro.component';
import { SelectLangComponent } from '../components/select-lang/select-lang';
import { HttpProvider } from '../providers/http/http';
import { ToastProvider } from '../providers/toast/toast';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LoginProvider } from '../providers/login/login';
import { MedicoProvider } from '../providers/medico/medico';
import { EstadoProvider } from '../providers/estado/estado';
import { CidadeProvider } from '../providers/cidade/cidade';
import { EspecialidadeProvider } from '../providers/especialidade/especialidade';
import { StatusProvider } from '../providers/status/status';


//translate
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CampoControlErroComponent,
    DetalheMedicoPage,
    ManterMedicoPage,
    SelectLangComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CampoControlErroComponent,
    DetalheMedicoPage,
    ManterMedicoPage,
    SelectLangComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider,
    HttpProvider,
    LoadingProvider,
    ToastProvider,
    LoginProvider,
    MedicoProvider,
    EstadoProvider,
    CidadeProvider,
    EspecialidadeProvider,
    StatusProvider,
  ]
})
export class AppModule {}
