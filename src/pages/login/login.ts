import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { RegistrationPage } from '../registration/registration';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

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