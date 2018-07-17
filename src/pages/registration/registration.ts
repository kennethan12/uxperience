import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Http } from '@angular/http';
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class RegistrationPage {

  public email: string;
  public firstname: string;
  public lastname: string;
  public password: string;
  public confirmPassword: string;
  public phone: string;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http) {

  }

  register() {
    this.http.post('http://localhost:3000/registration', {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }).subscribe(
      result => {
        console.log(result);
        this.navCtrl.push(LoginPage);
      },
      err => {
        console.log(err);
      }
    )
  }

  navigateToLogin() {
    console.log("Navigating to LoginPage...");

    this.navCtrl.push(LoginPage);
  }

}