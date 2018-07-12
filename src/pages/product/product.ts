import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../models/product';
import { PaymentPage } from '../payment/payment';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get("productParameter"); //new Product()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');

   /* this.productService.getAllProducts(
      (err, data) => {
        //TODO: Use the data
        if (err) {
          //Raise an alert UI
          return;
        }

        this.products = data;
      }
    ); 
    
    this.produceService.getAllProducts(
      function(err, data){
        this.products =data;
      }
    ); */
  }

  navigateToPayment() {
    console.log("Navigating to PaymentPage...");

    this.navCtrl.push(PaymentPage, { productParameter: this.product });
  }

}
