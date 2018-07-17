import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../models/product';
import { PaymentPage } from '../payment/payment';
import { ProductService } from '../../services/product.service';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  public product: Product = new Product();
  public productService: ProductService;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get("productParameter"); //new Product()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');




  }

  navigateToMenu() {
    console.log("Navigating to MenuPage...");
    this.navCtrl.push(MenuPage, {productParameter: this.product});
  }

}