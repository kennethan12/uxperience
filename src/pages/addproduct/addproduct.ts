import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ProductsPage } from '../products/products';
import { Time } from '@angular/common';
import { ProductPage } from '../product/product';
//for image upload
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the AddproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html',
})
export class AddproductPage {

  //for image upload
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: string = null;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;

  public name: string;
  public description: string;
  public price: string;
  public date: string[] = [];
  public time: string[] = [];

  public row: any
  public rows: Array<{}> = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    private afStorage: AngularFireStorage,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {



    if (localStorage.getItem("TOKEN")) {

      this.http.get("http://localhost:3000/verify?jwt=" + localStorage.getItem("TOKEN"))
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


  upload(event) {
    if (!event.target.files) return;


    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Uploading Image...',
      duration: 21031231
      
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();

      console.log("image upload is taking too long")
      
    }, 60000);

    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    


    this.task.snapshotChanges().subscribe(
      result => {
        result.ref.getDownloadURL().then(dl => {
          this.downloadURL = dl;
          loading.dismiss();
          console.log(this.downloadURL);
        }).catch(err => {
          console.log(err);
        });
      }
    )


   




  }


  addrow(): void {
    this.rows.push(this.row);
  }

  deleterow(): void {
    this.rows.pop();
  }

  addproduct(name: string, description: string, city:string ) {


    console.log('DOWNLOAD URL CHECK 1 = ' + this.downloadURL );

    this.http.post('http://localhost:3000/addproduct?jwt='+localStorage.getItem("TOKEN"), {
      name: name,
      description: description,
      city: city,
      photo_url: this.downloadURL

      
    }).subscribe(
      result => {
        console.log(result.json());
        let productInfo = result.json()
        for (let i = 0; i < this.date.length; i++) {

          this.http.post('http://localhost:3000/addmenu?product_id='+productInfo.product_id, {
            price: this.price,
            date: this.date[i],
            time: this.time[i]
          }).subscribe(
            result => {
              console.log(result.json());
            }, err => {
              console.log(err);
            }
          )
        }
        this.navCtrl.push(ProductsPage, productInfo)
      }, err => {
        console.log(err);
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddproductPage');
  }

}
