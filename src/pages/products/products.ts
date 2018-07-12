import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { Product } from '../models/product';
import { ProductPage } from '../product/product';
import { ProductService } from '../../services/product.service';
import { Http } from '@angular/http';
import { Location } from '../models/location';
import { LocationPage } from '../location/location';


@Component({
    selector: 'page-products',
    templateUrl: 'products.html'
})
export class ProductsPage {

    public products: Array<Product>;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public productService: ProductService,
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

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProductsPage');

        this.productService.getAllProducts(
            (err, data) => {
                if (err) {
                    return;
                }
                this.products = data;
            }
        );
    }

     navigateToLocation(location: Location) {
        this.navCtrl.push(LocationPage, {
            productParameter: location
        });
    }



  /* navigateToLocation() {
    console.log("Navigating to LocationPage...");

    this.navCtrl.push(LocationPage);
}
*/

    navigateToProfile() {
        console.log("Navigating to ProfilePage...");

        this.navCtrl.push(ProfilePage);
    }

}