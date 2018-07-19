import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../models/product';
import { PaymentPage } from '../payment/payment';
import { ProductService } from '../../services/product.service';
import { MenuPage } from '../menu/menu';
import { Http } from '@angular/http';
import { User } from '../models/user';
import { ReviewsPage } from '../reviews/reviews';
import { ReviewService } from '../../services/reviews.service';
import { Reviews } from '../models/reviews';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  public product: Product = new Product();
  public user: User = new User();
  public productService: ProductService;
  public reviewService: ReviewService;
  public reviews: Array<Reviews>

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.product = this.navParams.get("productParameter"); //new Product()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    this.initMap();
    this.http.get('https://localhost-ix-fs-2-2018.herokuapp.com/producthost?provider_id='+this.product.provider_id
    ).subscribe(
      result => {
        console.log(result);
        this.user = result.json();
      }, err => {
        console.log(err);
      }
    )

    this.reviews = this.reviewService.getAllReviews()

  }
  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: {lat: -33.906985, lng: 18.418393}
    });

    this.directionsDisplay.setMap(this.map);
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


  navigateToMenu() {
    console.log("Navigating to MenuPage...");
    this.navCtrl.push(MenuPage, {productParameter: this.product});
  }

}