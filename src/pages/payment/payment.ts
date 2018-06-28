import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../models/product';
import { HistoryPage } from '../history/history';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get("productParameter"); //new Product()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  navigateToHistory() {
    console.log("Navigating to HistoryPage...");

    this.navCtrl.push(HistoryPage, {productParameter: this.product});
  }

}
