import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../../models/account/account.interface';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  account = {} as Account;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AngularFireAuth, private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  navToReg(){
    this.navCtrl.push("SignupPage");
  }

  navToHome(){
    this.navCtrl.setRoot("HomePage");
  }

  // method to check authentication of user
  async login(){
    try{
      const result = await this.auth.auth.signInWithEmailAndPassword(this.account.email, this.account.password);
      this.navCtrl.setRoot("HomePage")
    }catch(e){
      this.toast.create({
        message: e.message,
        duration: 5000
      }).present();
    }
  }
}
