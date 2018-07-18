import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationPage } from '../location/location';
import { Location } from '../models/location'
import { LocationService } from '../../services/location.service';

/**
 * Generated class for the LocationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {

  public locationService: LocationService;
  public locations: Array<Location>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.locations = [];

    this.locationService = new LocationService();


    this.locations = this.locationService.getAllLocations();



  }






  ionViewDidLoad() {





  }

  navigateToLocation(location:Location) {
    console.log("Navigating to LocationPage...");

    

    this.navCtrl.push(LocationPage, {locationParameter : location});
  }

}