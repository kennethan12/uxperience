import { Component } from '@angular/core';
import { NavController, NavParams, Menu } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { Product } from '../models/product';
import { ProductPage } from '../product/product';
import { ProductService } from '../../services/product.service';
import { Http } from '@angular/http';
import { AddproductPage } from '../addproduct/addproduct';
import { LocationsPage } from '../locations/locations';
import { LocationPage } from '../location/location';
import { CategoriesPage } from '../categories/categories';
import { User } from '../models/user';
import { EditMyProductPage } from '../edit-my-product/edit-my-product';

@Component({
   selector: 'page-myexperiences',
   templateUrl: 'myexperiences.html'
})
export class MyexperiencesPage {

   public products: Array<Product>;
   public boughtProducts: Array<Product>;
   public user: User = new User;

   constructor(
       public navCtrl: NavController,
       public navParams: NavParams,
       public productService: ProductService,
       public http: Http
   ) {
       this.products = [];
      this.user = this.navParams.get("userParameter");

   }


   ionViewDidLoad() {
       console.log('ionViewDidLoad ProductsPage');

       if (localStorage.getItem("TOKEN")) {
     
        this.http.get("http://localhost:3000/verify?jwt=" + localStorage.getItem("TOKEN"))
          .subscribe(
            result => {
              console.log(result.json().user);

            },
            err => {
              console.log(err); // "Invalid log in"
            }
          );
      }
       

       this.http.get('http://localhost:3000/myproducts?user_id=' + this.user.user_id)
       .subscribe(
        result => {
            console.log(result);
            this.products = result.json()
        },
        err => {
            console.log(err);
        })

        this.http.get('http://localhost:3000/myboughtproducts?user_id=' + this.user.user_id)
       .subscribe(
        result => {
            console.log(result);
            this.boughtProducts = result.json()
        },
        err => {
            console.log(err);
        })
   }
   
   navigateToEditProduct(product: Product) {
    this.navCtrl.push(EditMyProductPage, {
        productParameter: product
    })
   }

   navigateToProduct(product: Product) {


    this.navCtrl.push(ProductPage, {
        productParameter: product,
    })
}

   navigateToAddProduct() {
     console.log("Navigating to AddproductPage...");

     this.navCtrl.push(AddproductPage);
 }
}