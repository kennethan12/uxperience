import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../models/product';
import { PaymentPage } from '../payment/payment';
import { ProductService } from '../../services/product.service';
import { MenuPage } from '../menu/menu';
import { Http } from '@angular/http';
import { User } from '../models/user';
import { Reviews } from '../models/reviews';
import { ReviewService } from '../../services/reviews.service';
import { OtherprofilePage } from '../otherprofile/otherprofile';
import { ProfilePage } from '../profile/profile';
import { Review } from '../models/review';
import { AddreviewPage } from '../addreview/addreview';
import { ReviewUserMap } from '../models/review-user';

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
  public me: User = new User();
  public productService: ProductService;
  public review: Review = new Review();
  public maps: Array<ReviewUserMap> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.product = this.navParams.get("productParameter");

    if (localStorage.getItem("TOKEN")) {

      this.http.get("http://localhost:3000/verify?jwt=" + localStorage.getItem("TOKEN"))
        .subscribe(
          result => {
            console.log(result.json());
            this.me = result.json().user;
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    this.initMap();
    this.http.get('http://localhost:3000/producthost?provider_id=' + this.product.provider_id
    ).subscribe(
      result => {
        console.log(result);
        this.user = result.json();
      }, err => {
        console.log(err);
      }
    )
    this.http.get('http://localhost:3000/getreviews?product_id=' + this.product.product_id
    ).subscribe(
      result => {
        console.log(result);
        let results = result.json();
        for (let i = 0; i < results.reviews.length; i++) {
          this.maps[i] = {
            review: results.reviews[i],
            user: results.users[i]
          }
        }
      }, err => {
        console.log(err);
      }
    )

  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: { lat: -33.906985, lng: 18.418393 }
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
    this.navCtrl.push(MenuPage, { productParameter: this.product });
  }

  navigateToOtherProfile() {
    if (this.user.user_id === this.me.user_id) {
      console.log("Navigating to ProfilePage");
      this.navCtrl.push(ProfilePage);
    } else {
      console.log("Navigating to OtherprofilePage");
      this.navCtrl.push(OtherprofilePage, {
        userParameter: this.user
      })
    }
  }

  navigateToAddReview() {
    console.log("Navigating to AddreviewPage")
    this.navCtrl.push(AddreviewPage, {
      productParameter: this.product
    })
  }

}