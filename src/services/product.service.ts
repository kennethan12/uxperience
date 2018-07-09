import { Product } from "../pages/models/product";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class ProductService {

    private products: Array<Product>;

    constructor(private http: Http) {
        this.products = [];
    }

    /*
        callback= function(err, data) {...}
    */
    getAllProducts(callback) {

        /*
        this.products = [];

        
        var product1 = new Product();
        product1.host = "Kenneth iX"
        product1.name = "Cape Town Food Tour";
        product1.description = "Enjoy an amazing food tour and try out essential local food that makes the Cape Town culture stand out from others.";
        product1.price = 100;
        product1.imageThumbnail = "../../assets/imgs/thumbnail-food.jpg";
        product1.image = "../../assets/imgs/food.jpg"

        /*
        var product2 = new Product();
        product2.host = "Erich iX";
        product2.name = "Surfing Lesson";
        product2.description = "Want to learn how to surf for a day? Join Erich and learn the basics of surfing in the beautiful ocean in Cape Town.";
        product2.price = 50;
        product2.imageThumbnail = "../../assets/imgs/thumbnail-surfing.jpg";
        product2.image = "../../assets/imgs/surfing.jpg"

        var product3 = new Product();
        product3.host = "Amy iX";
        product3.name = "Vineyard Wine Tour";
        product3.description = "Cape Town, South Africa, is almost notorious for its fantastic wine. Want to try them out? Join me on a fantastic wine tour and see for yourself why the wine in Cape Town is so great.";
        product3.price = 100;
        product3.imageThumbnail = "../../assets/imgs/thumbnail-wine.jpg";
        product3.image = "../../assets/imgs/wine.jpg"

        var product4 = new Product();
        product4.host = "Grace iX";
        product4.name = "Cape Town Yoga";
        product4.description = "Touring one of the most beautiful cities in the world isn't an excuse to avoid workouts. Join myUtopia at a cheap membership price for a fantastic hardcore yoga workout.";
        product4.price = 40;
        product4.imageThumbnail = "../../assets/imgs/thumbnail-yoga.jpg";
        product4.image = "../../assets/imgs/yoga.jpg"

        var product5 = new Product();
        product5.host = "Michelle iX";
        product5.name = "Cape Point Tour";
        product5.description = "Learn about Cape Town's history and culture in this rewarding tour. It's the most beautiful place in the world.";
        product5.price = 150;
        product5.imageThumbnail = "../../assets/imgs/thumbnail-cape-point.jpg";
        product5.image = "../../assets/imgs/cape-point.jpg"

        
        */

        /*
        this.products.push(product1);

        /*
        this.products.push(product2);
        this.products.push(product3);
        this.products.push(product4);
        this.products.push(product5);
        */

        /*
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
    
}