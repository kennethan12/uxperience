import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Category } from '../models/categories';
import { CategoryPage } from '../category/category';

/**
* Generated class for the CategoriesPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  public categories: Array<Category> = [];
  public category: Category = new Category();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');

    this.http.get("https://localhost-ix-fs-2-2018.herokuapp.com/allcategories")
      .subscribe(
        result => {
          console.log(result)
          this.categories = result.json();
        }, err => {
          console.log(err)
        }
      )
  }

  navigateToCategory(category: Category) {
    this.navCtrl.push(CategoryPage, {
      categoryParameter: category
    })
  }

}