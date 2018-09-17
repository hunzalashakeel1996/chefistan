import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth"
import { Account } from '../../models/account/account.interface';
import { Subscription } from 'rxjs';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';
import { DataService } from '../../providers/data/data';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnDestroy{

  account = {} as Account;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AngularFireAuth, private toast: ToastController, private data: DataService) {
    this.authenticatedUser$ = this.getUserAuthentication().subscribe((user: User) => {
      this.authenticatedUser = user;
    })
  }

  /**
   * block to register new user 
   */

  // method to add a user to firebase
  async register(){
    try{
      const result = await this.auth.auth.createUserWithEmailAndPassword(this.account.email, this.account.password);
      this.toast.create({
        message: "Your Account create successfully",
        duration: 30000
      }).present();    
      this.saveProfile();
      this.navCtrl.setRoot("HomePage");  

    }catch(e){
      this.toast.create({
        message: e.message,
        duration:3000
      }).present();
    }
  }

  /**
   * block to save information of the user in firebase
   */
  profile = {} as Profile;
  private authenticatedUser$: Subscription;
  private authenticatedUser: User;

  ngOnDestroy(): void {
    
    this.authenticatedUser$.unsubscribe();
    
  }
 
  // method the get login user information
  getUserAuthentication(){
    return this.auth.authState;
  }

  // method to add information of profile to database
  saveProfile(){
    const result = this.data.saveProfile(this.authenticatedUser, this.profile);
    this.navCtrl.setRoot("HomePage");
  }


}
