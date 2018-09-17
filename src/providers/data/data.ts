import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../../models/profile/profile.interface';
import { AngularFireObject, AngularFireDatabase } from "angularfire2/database"
import { User } from 'firebase';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the DataService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataService {

  profileObject: AngularFireObject<Profile>

  constructor(public http: HttpClient, private database: AngularFireDatabase, private toast: ToastController) {
  }

  async saveProfile(user: User, profile: Profile){
    this.profileObject = this.database.object(`/profiles/${user.uid}`)

    try{
      await this.profileObject.set(profile);
    }catch(e){
      this.toast.create({
        message: e.message,
        duration: 3000
      }).present();
    }
  }
}
