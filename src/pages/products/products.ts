import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FoodPage } from '../food/food';
import { SurfingPage } from '../surfing/surfing';
import { WinePage } from '../wine/wine';
import { YogaPage } from '../yoga/yoga';
import { CapePointPage } from '../capepoint/capepoint';
import { ProfilePage } from '../profile/profile';


@Component({
    selector: 'page-products',
    templateUrl: 'products.html'
})
export class ProductsPage {

    constructor(public navCtrl: NavController) {

    }

    navigateToFood() {
        console.log("Navigating to FoodPage...");

        this.navCtrl.push(FoodPage);
    }

    navigateToSurfing() {
        console.log("Navigating to SurfingPage...");

        this.navCtrl.push(SurfingPage);
    }

    navigateToWine() {
        console.log("Navigating to WinePage...");

        this.navCtrl.push(WinePage);
    }

    navigateToYoga() {
        console.log("Navigating to YogaPage...");

        this.navCtrl.push(YogaPage);
    }

    navigateToCapePoint() {
        console.log("Navigating to CapePointPage...");

        this.navCtrl.push(CapePointPage);
    }

    navigateToProfile() {
        console.log("Navigating to ProfilePage...");

        this.navCtrl.push(ProfilePage);
    }
}