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
  public date: string[] = [];
  public time: string[] = [];

  public row: any
  public rows: Array<{}> = [];

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

  addrow(): void {
    this.rows.push(this.row);
  }

  deleterow(): void {
    this.rows.pop();
  }

  addproduct(name: string, description: string, city:string ) {

    this.http.post('http://localhost:3000/addproduct?jwt='+localStorage.getItem("TOKEN"), {
      name: name,
      description: description,
      city: city
    }).subscribe(
      result => {
        console.log(result.json());
        let productInfo = result.json()
        for (let i = 0; i < this.date.length; i++) {

          this.http.post('http://localhost:3000/addmenu?product_id='+productInfo.product_id, {
            price: this.price,
            date: this.date[i],
            time: this.time[i]
          }).subscribe(
            result => {
              console.log(result.json());
            }, err => {
              console.log(err);
            }
          )
        }
        this.navCtrl.push(ProductsPage, productInfo)
      }, err => {
        console.log(err);
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddproductPage');
  }

}
