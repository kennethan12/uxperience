import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ProductsPage } from '../products/products';
import { Time } from '@angular/common';
import { ProductPage } from '../product/product';

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
  public date: Date;
  public time: Time;

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
          },
          err => {
            console.log(err); // "Invalid log in"
          }
        );
    }




  }

  addproduct(name: string, description: string, price: number, date: string, time:string) {

    this.http.post('http://localhost:3000/addproduct?jwt='+localStorage.getItem("TOKEN") + '&productName=' + 
    
    name + '&productDescription=' + description, {
      // name: this.name,
      // description: this.description,
      price: price,
      date: date.toString(),
      time: time.toString()
    }).subscribe(
      result => {
        console.log(result.json());
        this.navCtrl.push(ProductsPage, {
          productInfo: result.json()
        })
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
