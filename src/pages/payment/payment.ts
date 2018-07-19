import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../models/product';
import { HistoryPage } from '../history/history';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Menu } from '../models/menu';
import { PaymentconfirmPage } from '../paymentconfirm/paymentconfirm';

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

  public menu: Menu = new Menu;
  public product: Product = new Product();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    private cd: ChangeDetectorRef
  ) {

    this.menu = this.navParams.get("menuParameter");
    this.product = this.navParams.get("productParameter");

    if (localStorage.getItem("TOKEN")) {
      
      this.http.get("http://localhost:3000/verify?jwt=" + localStorage.getItem("TOKEN"))
        .subscribe(
          result => {
            console.log(result.json());
            this.menu = this.navParams.get('menuParameter');
          },
          err => {
            console.log(err); // "Invalid log in"
          }
        );
    }
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
    const result = await stripe.createSource(this.card);
    // console.log(token);
    // console.log('@@@@@@');
    // console.log(error);
    let error = result.error;
    let source = result.source;
    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', source);
      // ...send the token to the your backend to process the charge

      this.http.post("https://localhost-ix-fs-2-2018.herokuapp.com/payments/?jwt=" + localStorage.getItem("TOKEN") + "&menu_id=" + this.menu.menu_id, {
        stripeToken: source,
        menuId: this.menu.menu_id
      }).subscribe(
        result => {
          var paymentConfirm = result.json();
          console.log(paymentConfirm)
          this.navCtrl.push(PaymentconfirmPage, {
            productParameter: this.product,
            menuParameter: this.menu,
            paymentConfirm
          });
        },

        err => {
          console.log(err);
        }
      )
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');

    this.http.get("https://localhost-ix-fs-2-2018.herokuapp.com/productinfo?product_id="+this.product.product_id
    ).subscribe(
      result => {
        console.log(result)
      }, err => {
        console.log(err);
      }
    )

    this.http.get("https://localhost-ix-fs-2-2018.herokuapp.com/menuinfo?menu_id="+this.menu.menu_id
    ).subscribe(
      result => {
        console.log(result)
      }, err => {
        console.log(err)
      }
    )
  }

  navigateToHistory() {
    console.log("Navigating to HistoryPage...");

    this.navCtrl.push(HistoryPage, {productParameter: this.product});
  }

  navigateToPaymentConfirm() {
    console.log("Navigating to PaymentconfirmPage");

    this.navCtrl.push(PaymentconfirmPage, {
      productParameter: this.product,
      menuParameter: this.menu
    });
  }

  

}
