import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistrationPage } from '../registration/registration';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProductsPage } from '../products/products';
<<<<<<< HEAD
import { PaymentPage } from '../payment/payment';
=======
>>>>>>> 84c1653c1736182b1f07da52f264afe942688efb

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
<<<<<<< HEAD
            this.navCtrl.push(ProductsPage);
=======
>>>>>>> 84c1653c1736182b1f07da52f264afe942688efb
          },
          err => {
            console.log(err); // "Invalid log in"
          }
        );
<<<<<<< HEAD
=======

        this.navCtrl.push(ProductsPage);
>>>>>>> 84c1653c1736182b1f07da52f264afe942688efb
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