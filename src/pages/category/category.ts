import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Category } from '../models/categories';
import { Product } from '../models/product';
import { Http } from '@angular/http';
import { ProductPage } from '../product/product';

/**
* Generated class for the CategoriesPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  public category: Category = new Category();
  public products: Array<Product>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http
  ) {
      this.category = this.navParams.get("categoryParameter");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');

    this.http.get("https://localhost-ix-fs-2-2018.herokuapp.com/categoryproducts?category_id="+this.category.category_id)
    .subscribe(
      result => {
        console.log(result);
        this.products = result.json();
      }, err => {
        console.log(err);
      }
    )
  }

  navigateToProduct(product: Product) {


    this.navCtrl.push(ProductPage, {
        productParameter: product,
    })
}

}