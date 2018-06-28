import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { Product } from '../models/product';
import { ProductPage } from '../product/product';
import { ProductService } from '../../services/product.service';


@Component({
    selector: 'page-products',
    templateUrl: 'products.html'
})
export class ProductsPage {

    public products: Array<Product>;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                public productService: ProductService) {

        this.products = [];

        this.products = this.productService.getAllProducts();
    }

    navigateToProduct(product: Product) {
        this.navCtrl.push(ProductPage, {
            productParameter: product
        });
    }

    navigateToProfile() {
        console.log("Navigating to ProfilePage...");

        this.navCtrl.push(ProfilePage);
    }

}