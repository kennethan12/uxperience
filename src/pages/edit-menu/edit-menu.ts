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
  selector: 'page-edit-menu',
  templateUrl: 'edit-menu.html',
})
export class EditMenuPage {

  public product: Product = new Product;
  public menuItems: Array<Menu>;
  public menu: Menu = new Menu;

  public date: string[] = [];
  public time: string[] = [];
  public price: number[] = [];


  public row: any
  public rows: Array<{}> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http) {

    this.product = this.navParams.get("productParameter");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');

    this.http.get('https://localhost-ix-fs-2-2018.herokuapp.com/allmenuinfo?product_id=' + this.product.product_id)
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



  addrow(): void {
    this.rows.push(this.row);
  }

  deleterow(): void {
    this.rows.pop();
    this.date.pop();
    this.time.pop();
    this.price.pop();
  }

  removeExistingRow(menu: Menu, i: number) {
    this.http.get('https://localhost-ix-fs-2-2018.herokuapp.com/deletemenu?menu_id=' + menu.menu_id).subscribe(
      result => {

        console.log(result);
        var index = this.menuItems.indexOf(menu, 0);
        if (index > -1) {
          this.menuItems.splice(index, 1);
        }

      },
      err => {
        console.log(err);
      }
    );

  }

  addMenus() {
    if (this.rows.length == 0) {
      this.navCtrl.pop();
    }
    for (let i = 0; i < this.rows.length; i++) {


      if (this.price[i] != null && this.date[i] != null && this.time[i] != null) {

        this.http.post('https://localhost-ix-fs-2-2018.herokuapp.com/addmenu?product_id=' + this.product.product_id, {
          price: this.price[i],
          date: this.date[i],
          time: this.time[i]
        }).subscribe(
          result => {

            this.menuItems.push(result.json());

          }, err => {
            console.log(err);

          }
        )

      }


    }
    this.rows = [];
    this.row = null;
    this.price = [];
    this.date = [];
    this.time = [];



  }
}


