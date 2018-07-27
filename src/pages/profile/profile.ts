import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, App, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HistoryPage } from '../history/history';
import { Http } from '@angular/http';
import { User } from '../models/user';
import { MyexperiencesPage } from '../myexperiences/myexperiences';
import { SettingsPage } from '../settings/settings';

import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  public user: User = new User();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private app: App,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {

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
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    this.http.get("http://localhost:3000/user?jwt="+localStorage.getItem("TOKEN")
    ).subscribe(
      result => {
        console.log(result);
        this.user = result.json();
      }, err => {
        console.log(err)
      }
    )

  }
  
  navigateToHome() {
    console.log("Navigating to HomePage...");

    const confirm = this.alertCtrl.create({
      title: 'Log out?',
      message: 'Logging out will refer you back to the home page.',
      buttons: [
        {
          text: 'Log out',
          handler: () => {
            console.log('Log out clicked');
            localStorage.removeItem("TOKEN");
            this.app.getRootNav().setRoot(HomePage);
            this.presentToast();
            
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
        
      ]
    });
    confirm.present();
  }

  navigateToHistory() {
    console.log("Navigating to HistoryPage...");

    this.navCtrl.push(HistoryPage);

  }
  navigateToExperiences() {
    console.log("Navigating to ExperiencesPage...");

    this.navCtrl.setRoot(MyexperiencesPage, {
      userParameter: this.user
    });

  }

  navigateToSettings() {
    console.log("Navigating to SettingsPage...");

    this.navCtrl.push(SettingsPage);
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'You have been logged out successfully',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();

  }
}