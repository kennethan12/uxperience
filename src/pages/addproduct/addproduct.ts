import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ProductsPage } from '../products/products';
import { Menu } from '../../../node_modules/ionic-angular/umd/components/app/menu-interface';

/**
 * Generated class for the AddproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html',
})
export class AddproductPage {

  public name: string;
  public description: string;
  public price: string;
  public date_time: Date;
  public availability: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http
  ) {}

  addproduct() {
    this.http.post('http://localhost:3000/addproduct', {
      name: this.name,
      description: this.description,
      price: this.price,
      date_time: this.date_time
    }).subscribe(
      result => {
        console.log(result);

        var menu_extract=result.json();
        

        this.navCtrl.push(ProductsPage, menu_extract.menu_id);

      },
      err => {
        console.log(err);
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddproductPage');
  }

}
