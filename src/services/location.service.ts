import { Location } from "../pages/models/location";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class LocationService {

    private locations: Array<Location>;

    constructor() {
        this.locations = [];
    }

    /*
        callback= function(err, data) {...}
    */
    getAllLocations() {

        var location1 = new Location();

        location1.name = "Cape Town";
        location1.id = 1;
        location1.image = "../assets/imgs/arizona-card.jpg"



        var location2 = new Location();

        location2.name = "Johannesburg";
        location2.id = 2;
        location2.image = "../assets/imgs/johannesburg.jpg"




        var location3 = new Location();

        location3.name = "Durban";
        location3.id = 3;
        location3.image = "../assets/imgs/new-york-card.jpg"




        var location4 = new Location();

        location4.name = "Port Elizabeth";
        location4.id = 4;
        location4.image = "../assets/imgs/paris-card.jpg"

       this.locations.push(location1); 
       this.locations.push(location2); 
       this.locations.push(location3); 
       this.locations.push(location4); 


       return this.locations;
    }
}
