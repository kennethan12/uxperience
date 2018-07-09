import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../models/product';
import { HistoryPage } from '../history/history';
import { Http } from '@angular/http';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage{

  public product: Product = new Product();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http
  ) {

    if (localStorage.getItem("TOKEN")) {
      
      this.http.get("http://localhost:3000/verify?jwt=" + localStorage.getItem("TOKEN"))
        .subscribe(
          result => {
            console.log(result.json());
            this.product = this.navParams.get("productParameter"); //new Product()
          },
          err => {
            console.log(err); // "Invalid log in"
          }
        );
    }
    //this.product = this.navParams.get("productParameter"); //new Product()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  navigateToHistory() {
    console.log("Navigating to HistoryPage...");

    this.navCtrl.push(HistoryPage, {productParameter: this.product});
  }

}
