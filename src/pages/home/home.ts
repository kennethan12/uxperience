import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistrationPage } from '../registration/registration';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProductsPage } from '../products/products';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http) {

    if (localStorage.getItem("TOKEN")) {

      this.http.get("http://localhost:3000/verify?jwt=" + localStorage.getItem("TOKEN"))
        .subscribe(
          result => {
            console.log(result.json());
          },
          err => {
            console.log(err); // "Invalid log in"
          }
        );

        this.navCtrl.push(ProductsPage);
    }
  }

  navigateToLogin() {
    console.log("Navigating to LoginPage...");

    this.navCtrl.push(LoginPage);
  }

  navigateToRegistration() {
    console.log("Navigating to RegistrationPage...")

    this.navCtrl.push(RegistrationPage);
  }

}
