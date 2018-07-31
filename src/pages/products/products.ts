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
import { CategoriesPage } from '../categories/categories';


@Component({
    selector: 'page-products',
    templateUrl: 'products.html'

})
export class ProductsPage {

    public products: Array<Product>;
    public user: User = new User();

    descending: boolean = false;
    order: number;
    column: string = 'name';





    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public productService: ProductService,
        public http: Http
    ) {
        this.products = [];

        if (localStorage.getItem("TOKEN")) {

            this.http.get("https://localhost-ix-fs-2-2018.herokuapp.com/verify?jwt=" + localStorage.getItem("TOKEN"))
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

        this.productService.getAllProducts((err, data) => {
            if (err) {
                throw err;
            }
            this.products = data;
        })
    }

    sort() {
        this.descending = !this.descending;
        this.order = this.descending ? 1 : -1;
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





