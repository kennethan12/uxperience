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
import { User } from '../models/user';


@Component({
    selector: 'page-products',
    templateUrl: 'products.html',

    template: `
    <ion-tabs>
      <ion-tab tabIcon="heart" [root]="ProductsPage"></ion-tab>
      <ion-tab tabIcon="star" [root]="LocationsPage"></ion-tab>
      <ion-tab tabIcon="circle" [root]="ProfilePage"></ion-tab>
    </ion-tabs>`

})
export class ProductsPage {

    public products: Array<Product>;
    public user: User = new User();



    public tab1: any;
    public tab2: any;
    public tab3: any;


    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public productService: ProductService,
        public http: Http
    ) {
        this.products = [];

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


        this.tab1 = ProductPage;
        this.tab2 = LocationsPage;
        this.tab3 = ProfilePage;




    }

    /*
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
        }*/

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProductsPage');

        this.productService.getAllProducts((err, data) => {
            if (err) {
                throw err;
            }
            this.products = data;
        })
    }


    navigateToProduct(product: Product) {


        this.navCtrl.push(ProductPage, {
            productParameter: product,
        })
    }

    navigateToProfile() {
        console.log("Navigating to ProfilePage...");

        this.navCtrl.push(ProfilePage);
    }

    navigateToAddProduct() {
        console.log("Navigating to AddproductPage...");

        this.navCtrl.push(AddproductPage);
    }

    navigateToLocations() {
        console.log("Navigating to LocationsPage...");

        this.navCtrl.push(LocationsPage);
    }
}