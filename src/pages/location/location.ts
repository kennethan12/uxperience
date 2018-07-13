import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Location } from '../models/location';
import { Product } from '../models/product';
import { ProductPage } from '../product/product';

import {ProductService} from '../../services/product.service';

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  public location: Location = new Location();

  public products: Array<Product>;

  constructor(public navCtrl: NavController, public navParams: NavParams, productService: ProductService) {
    this.location = this.navParams.get("locationParameter"); //new Location()

    this.products = productService.getAllProducts();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }

  navigateToProduct() {
    this.navCtrl.push(ProductPage, {
        productParameter: Product
    });
  }

}




