import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../models/product';
import { Http } from '@angular/http';
import { ProductPage } from '../product/product';

/**
 * Generated class for the AddreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addreview',
  templateUrl: 'addreview.html',
})
export class AddreviewPage {

  public product: Product = new Product();
  public rating: number;
  public description: string;
  public flag: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http
  ) {
    this.product = this.navParams.get('productParameter');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddreviewPage');
  }

  addReview() {
    this.http.post('https://localhost-ix-fs-2-2018.herokuapp.com/addreview?jwt='
      + localStorage.getItem("TOKEN")
      + "&product_id=" + this.product.product_id, {
        rating: this.rating,
        description: this.description
      }).subscribe(
        result => {
          console.log(result);
          this.http.get('https://localhost-ix-fs-2-2018.herokuapp.com/addrating?product_id=' + this.product.product_id)
            .subscribe(
              result => {
                console.log(result);
                this.navCtrl.setRoot(ProductPage, {
                  productParameter: this.product
                })
              }, err => {
                console.log(err);
              }
            )
        }, err => {
          console.log(err);
          this.flag = true;
        }
      )
  }

}
