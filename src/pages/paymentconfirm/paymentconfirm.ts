import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../models/product';
import { Menu } from '../models/menu';
import { Transaction } from '../models/transaction';
import { ProductsPage } from '../products/products';

/**
 * Generated class for the PaymentconfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paymentconfirm',
  templateUrl: 'paymentconfirm.html',
})
export class PaymentconfirmPage {

  public product: Product = new Product();
  public menu: Menu = new Menu();
  public transaction: Transaction = new Transaction();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get("productParameter"),
    this.menu = this.navParams.get("menuParameter"),
    this.transaction = this.navParams.get("paymentConfirm")

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentconfirmPage');

  }

  navigateToProducts() {
    this.navCtrl.setRoot(ProductsPage);
  }

}
