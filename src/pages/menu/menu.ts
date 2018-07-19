import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Menu } from '../models/menu';
import { Product } from '../models/product';
import { PaymentPage } from '../payment/payment';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  public product: Product = new Product;
  public menuItems: Array<Menu>;
  public menu: Menu = new Menu;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http) {
      this.product = this.navParams.get("productParameter");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');

    this.http.get('https://localhost-ix-fs-2-2018.herokuapp.com/allmenuinfo?product_id='+this.product.product_id)
    .subscribe(
      result => (
        console.log(result),
        this.menuItems = result.json()
      ), err => (
        console.log(err)
      )
    )
    
  }

  navigateToPayment(menu: Menu) {
    console.log("Navigating to PaymentPage...");

    this.navCtrl.push(PaymentPage, { 
      menuParameter: menu,
      productParameter: this.product
    });
  }

}
