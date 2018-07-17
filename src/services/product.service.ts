import { Product } from "../pages/models/product";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { callbackify } from "util";

@Injectable()
export class ProductService {


    


    constructor(public http: Http) {

    }

    getProductByCity(locationName: string, callback){


        this.http.get("http://localhost:3000/productbylocation?city=" + locationName ).subscribe(

            result => {

                callback(null,result);
            },
            err => {
                console.log(err);
            }
        )

    }






    getAllProducts(callback) {
        // if (this.products.length) return this.products;
        this.http.get("http://localhost:3000/allproducts")
        .subscribe(
            result => {
                console.log(result);
                let products = result.json() as Array<Product>
                callback(null, products);
            },
            err => {
                console.log(err);
                callback(err);
            }
        )
        




        // return this.products;

        /*
    
        this.products.push(product1);

        
        this.products.push(product2);
        this.products.push(product3);
        this.products.push(product4);
        this.products.push(product5);
        

        
        return this.products;
        

        // 'http://127.0.0.1:3000/login?email=' + email + "&param2=" + param2

        //var url = 'http://127.0.0.1:3000/login';

        /*this.http.get('http://127.0.0.1:3000/login')
            .subscribe(
                result => {
                    console.log("Result: ", result);
                    callback(null, result);
                },
                err => {
                    console.log("Err: ", err);
                    callback(err, null);
                }
            );
        this.http.get('url')*/
    }

    /*
    createProduct(productData: Product, callback: Function) {
        this.http.post("http://localhost:3000/addproduct", productData)
            .subscribe(
                result => {
                    callback(null, result.json());
                },
                err => {
                    callback(err, null);
                }
            )
    }
    */
    
}