import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../models/product';
import { HistoryPage } from '../history/history';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage implements AfterViewInit, OnDestroy{

  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    private cd: ChangeDetectorRef
  ) {

    if (localStorage.getItem("TOKEN")) {
      
      this.http.get("http://localhost:3000/verify?jwt=" + localStorage.getItem("TOKEN"))
        .subscribe(
          result => {
            console.log(result.json());
            this.product = this.navParams.get("productParameter"); //new Product()
          },
          err => {
            console.log(err); // "Invalid log in"
          }
        );
    }
    //this.product = this.navParams.get("productParameter"); //new Product()
  }

  ngAfterViewInit(): void {
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy(): void {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      // ...send the token to the your backend to process the charge

      this.http.post("http://localhost:3000/payments?jwt=" + localStorage.getItem("TOKEN"), {
        stripeToken: token.id,
        menuId: 1
      }).subscribe(
        result => {
          var json = result.json();
          // json.id;
        },

        err => {
          console.log(err);
        }
      )
    }
  }

  public product: Product = new Product();
  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  navigateToHistory() {
    console.log("Navigating to HistoryPage...");

    this.navCtrl.push(HistoryPage, {productParameter: this.product});
  }

  

}
