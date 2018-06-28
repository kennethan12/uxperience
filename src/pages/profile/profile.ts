import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HistoryPage } from '../history/history';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public navCtrl: NavController) {

  }
  
  navigateToHome() {
    console.log("Navigating to HomePage...");

    this.navCtrl.push(HomePage);
  }

  navigateToHistory() {
    console.log("Navigating to HistoryPage...");

    this.navCtrl.push(HistoryPage);
  }
}