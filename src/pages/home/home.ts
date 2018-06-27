import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistrationPage } from '../registration/registration';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

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
