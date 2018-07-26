import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { User } from '../models/user';

/**
 * Generated class for the OtherprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otherprofile',
  templateUrl: 'otherprofile.html',
})
export class OtherprofilePage {

  public user: User = new User();
  public host: User = new User();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http
  ) {
    this.user = this.navParams.get("userParameter");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherprofilePage');

    this.http.get("http://localhost:3000/producthost?provider_id="+this.user.user_id)
    .subscribe(
      result => {
        console.log(result);
        this.host = result.json();
      }, err => {
        console.log(err);
      }
    )
  }

}
