import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Menu } from 'ionic-angular';
import { Product } from '../models/product';
import { ProductPage } from '../product/product';
import { ProductService } from '../../services/product.service';
import { Http } from '@angular/http';
import { AddproductPage } from '../addproduct/addproduct';
import { User } from '../models/user';
import { EditMyProductPage } from '../edit-my-product/edit-my-product';
import { Chart } from 'chart.js';
import { Transaction } from '../models/transaction';
import { ProductsPage } from '../products/products';

@Component({
    selector: 'page-myexperiences',
    templateUrl: 'myexperiences.html'
})
export class MyexperiencesPage {

    public products: Array<Product>;
    public boughtProducts: Array<Product>;
    public boughtProductsNames: Array<string> = [];
    public boughtProductsPrices: Array<number> = [];
    public user: User = new User;
    public transactions: Array<Transaction>;
    public boughtProductsBoolean: boolean = false;
    public productsBoolean: boolean = false;

    @ViewChild('doughnutCanvas') doughnutCanvas;
    doughnutChart: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public productService: ProductService,
        public http: Http
    ) {
        this.products = [];
        this.user = this.navParams.get("userParameter");

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

        if (localStorage.getItem("TOKEN")) {

            this.http.get("https://localhost-ix-fs-2-2018.herokuapp.com/verify?jwt=" + localStorage.getItem("TOKEN"))
                .subscribe(
                    result => {
                        console.log(result.json().user);

                    },
                    err => {
                        console.log(err); // "Invalid log in"
                    }
                );
        }


        this.http.get('https://localhost-ix-fs-2-2018.herokuapp.com/myproducts?user_id=' + this.user.user_id)
            .subscribe(
                result => {
                    console.log(result);
                    this.products = result.json();
                    //if (this.products.length > 0) { this.productsBoolean = true; }
                },
                err => {
                    console.log(err);
                })

        this.http.get('https://localhost-ix-fs-2-2018.herokuapp.com/myboughtproducts?user_id=' + this.user.user_id)
            .subscribe(
                result => {
                    console.log(result);
                    this.boughtProducts = result.json();
                    //if (this.boughtProducts.length > 0) { this.boughtProductsBoolean = true; }
                },
                err => {
                    console.log(err);
                })

        this.http.get('https://localhost-ix-fs-2-2018.herokuapp.com/gettransactions?jwt=' + localStorage.getItem("TOKEN")
        ).subscribe(
            result => {
                console.log(result);
                this.transactions = result.json();
                for (let transaction of this.transactions) {
                    this.http.get('https://localhost-ix-fs-2-2018.herokuapp.com/history?transaction_id=' + transaction.transaction_id)
                        .subscribe(
                            result => {
                                this.boughtProductsPrices.push(result.json().menu.price);
                                this.boughtProductsNames.push(result.json().product.name);
                                this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

                                    type: 'doughnut',
                                    data: {
                                        labels: this.boughtProductsNames,
                                        datasets: [{
                                            label: 'What you bought',
                                            data: this.boughtProductsPrices,
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.2)',
                                                'rgba(54, 162, 235, 0.2)',
                                                'rgba(255, 206, 86, 0.2)',
                                                'rgba(75, 192, 192, 0.2)',
                                                'rgba(153, 102, 255, 0.2)'
                                            ],
                                            hoverBackgroundColor: [
                                                "#FF6384",
                                                "#36A2EB",
                                                "#FFCE56",
                                                "#FF6384",
                                                "#36A2EB"
                                            ]
                                        }]
                                    }
                                });
                            }, err => {
                                console.log(err);
                            }
                        )
                };
            }, err => {
                console.log(err);
            }
        )
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

    navigateToProducts() {
        this.navCtrl.setRoot(ProductsPage);
    }
}