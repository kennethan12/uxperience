import { Product } from "../pages/models/product";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class ProductService {

    private products: Array<Product>;

    constructor(public http: Http) {
        this.products = [];
    }

    /*
        callback= function(err, data) {...}
    */
    getAllProducts(callback) {
        // if (this.products.length) return this.products;

        this.http.get("http://localhost:3000/allproducts")
        .subscribe(
            result => {
                console.log(result);
                let products = result.json() as Array<Product>
                callback(null, products.reverse());
            },
            err => {
                console.log(err);
                callback(err);
            }
        )
    }

    getUserProducts(callback) {

        this.http.get("http://localhost:3000/myproducts")
        .subscribe(
            result => {
                console.log(result);
                let products = result.json() as Array<Product>
                callback(null, products.reverse());
            },
            err => {
                console.log(err);
                callback(err);
            }
        )
    }
}