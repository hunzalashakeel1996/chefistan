import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from "angularfire2"
import { MyApp } from './app.component';
import { FIREBASECONFIG } from '../firebase.config';
import { AngularFireAuthModule } from "angularfire2/auth";
import { DataService } from '../providers/data/data';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from "angularfire2/database"
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASECONFIG),
    AngularFireAuthModule,
    HttpClientModule,
    HttpModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService
  ]
})
export class AppModule {}
