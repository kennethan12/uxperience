import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { RegistrationPage } from '../registration/registration';
import { ProductsPage } from '../products/products';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public email: string;
  public password: string;
  public names: Array<string>;
  public names2: string[];
  public age: number;
  
  public flag: boolean = true;

  public complexObject: any;

  constructor(public navCtrl: NavController) {

    /* class notes */

    this.email = "email@gmail.com"

    this.names = [
      "miki",
      "perry",
      "sabreena"
    ];

    this.names.push("Erich");

    this.complexObject = {
      property1: "Some value",
      property2: "Another value"
    };
  }

  pressMe(argument1: string, argument2: number) {
    console.log("This email is: " + this.email);

    console.log("Argument 1:", argument1);
    console.log("Argument 2:", argument2);
  }

  loopOne() {
    for (var i = 0; i < this.names.length; i++)  {
      console.log("Element: ", this.names[i]);
    }

    console.log("First element: ", this.names[0]);
  }

  loopTwo() {
    this.names.forEach((item) => {
      console.log("Element: ", item);
    })
  }

  login() {
    if (this.password == "my-secure-password") {
      // Navigate
    } else {
      // Stay here...
    }

    /*
    if (this.age < 21) {
      // No drinking allowed
    } else {
      // Party
    }
    */
  }

  /* end of notes */

  navigateToProducts() {
    console.log("Navigating to ProductsPage...");

    this.navCtrl.push(ProductsPage);
  }

  navigateToProfile() {
    console.log("Navigating to ProfilePage...");

    this.navCtrl.push(ProfilePage);
  }

  navigateToRegistration() {
    console.log("Navigating to RegistrationPage...")

    this.navCtrl.push(RegistrationPage);
  }
}

