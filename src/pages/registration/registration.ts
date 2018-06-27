import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class RegistrationPage {

  constructor(public navCtrl: NavController) {

  }

  navigateToLogin() {
    console.log("Navigating to LoginPage...");

    this.navCtrl.push(LoginPage);
  }

}