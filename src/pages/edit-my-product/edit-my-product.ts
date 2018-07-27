import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../models/product';
import { Http } from '../../../node_modules/@angular/http';
//for image uplaod
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { get } from '../../../node_modules/@ionic-native/core';
import { ProfilePage } from '../profile/profile';
import { CategoriesPage } from '../categories/categories';
import { Category } from '../models/categories';
import { MyexperiencesPage } from '../myexperiences/myexperiences';
import { User } from '../models/user';
import { EditMenuPage } from '../edit-menu/edit-menu';

import { ToastController } from 'ionic-angular';

/**
 * Generated class for the EditMyProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-edit-my-product',
  templateUrl: 'edit-my-product.html',
})
export class EditMyProductPage {

  //for image upload
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: string = null;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;

  public product: Product = new Product();
  public change_name: boolean = false;
  public changed_name: string = null;

  public change_description: boolean = false;
  public changed_description: string = null;

  public change_category: boolean = false;

  public changed_category: Category;

  public changed_product: Product = new Product();

  public product_category: Category;

  public other_category: Category;

  public categories: Category[];

  public user: User = new User();


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
    //for image upload
    private afStorage: AngularFireStorage,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController) {




    if (localStorage.getItem("TOKEN")) {

      this.http.get("http://localhost:3000/verify?jwt=" + localStorage.getItem("TOKEN"))
        .subscribe(
          result => {
            console.log(result.json());

            this.user = result.json().user;
          },
          err => {
            console.log(err); // "Invalid log in"
          }
        );
    }



    //get product values
    this.product = this.navParams.get("productParameter");


    //turn category id into name
    this.http.get('http://localhost:3000/categorybyid?category_id=' + this.product.category_id).subscribe(

      result => {
        this.product_category = result.json() as Category;
      },
      err => {
        console.log(err);
      }
    )

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditMyProductPage');
    this.http.get('http://localhost:3000/allcategories')
      .subscribe(
        result => {
          console.log(result)
          this.categories = result.json();
        }, err => {
          console.log(err)
        }
      )
  }

  update_product() {
    //if other category is chosen, create it and assign it to passed in product
    if (this.other_category != null) {
      this.http.post('http://localhost:3000/addcategory', {
        name: this.other_category
      }).subscribe(
        result => {

          let categoryInfo: Category = result.json();

          this.changed_product.category_id = categoryInfo.category_id;

          //after categories do everyting else

          //assign all variables to changed product
          this.changed_product.name = this.changed_name;
          this.changed_product.description = this.changed_description;



          //UPDATE PRODUCT AND CHANGE PAGE

          this.http.post('http://localhost:3000/updateproduct?productid=' + this.product.product_id, {

            name: this.changed_product.name,
            description: this.changed_product.description,
            category_id: this.changed_product.category_id

          }).subscribe(
            result => {
              console.log(result.json());

              this.navCtrl.pop();

              

            },
            err => {
              console.log(err);
            }
          );



        },
        err => {
          console.log(err);
        }
      );
    }

    //if existing category is chosen find id and assign to passed in product
    //for some reason changed_category is a string
    else if (this.changed_category != null) {

      this.http.get('http://localhost:3000/categorybyname?category_name=' + this.changed_category).subscribe(
        result => {

          let categoryInfo: Category = result.json();

          this.changed_product.category_id = categoryInfo.category_id;



          //AFTER CATEGORIES DO EVERYTHING ELSE

          //assign all variables to changed product
          this.changed_product.name = this.changed_name;
          this.changed_product.description = this.changed_description;

          //UPDATE PRODUCT AND CHANGE PAGE
          this.http.post('http://localhost:3000/updateproduct?productid=' + this.product.product_id, {

            name: this.changed_product.name,
            description: this.changed_product.description,
            category_id: this.changed_product.category_id

          }).subscribe(
            result => {
              console.log(result.json());
              this.navCtrl.pop();
            },
            err => {
              console.log(err);
            }
          );



        },
        err => {
          console.log(err);
        }
      );
    }
    else {

      //assign all variables to changed product
      this.changed_product.name = this.changed_name;
      this.changed_product.description = this.changed_description;



      //UPDATE PRODUCT AND CHANGE PAGE

      this.http.post('http://localhost:3000/updateproduct?productid=' + this.product.product_id, {

        name: this.changed_product.name,
        description: this.changed_product.description,
        category_id: this.changed_product.category_id

      }).subscribe(
        result => {
          console.log(result.json());

          this.navCtrl.setRoot(MyexperiencesPage, {
            userParameter: this.user
          });

        },
        err => {
          console.log(err);
        }
      );

    }





  }

  delete_product() {


    const confirm = this.alertCtrl.create({
      title: 'Remove Experience?',
      message: 'Once this experience is removed it cannot be undone.',
      buttons: [
        {
          text: 'Remove',
          handler: () => {
            console.log('Remove item clicked');


            this.http.get('http://localhost:3000/deleteproduct?productid=' + this.product.product_id).subscribe(
              
            result => { 
              this.navCtrl.setRoot(MyexperiencesPage, {userParameter:this.user});

              this.presentToast();


            },

              err => {
                console.log(err);
              });


              

          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        
      ]
    });
    confirm.present();
  }
















  change_product_name() {

    this.change_name = true;
  }

  change_product_description() {

    this.change_description = true;
  }
  change_product_category() {

    this.change_category = true;
  }




  navigateToEditMenu() {

    this.navCtrl.push(EditMenuPage, { productParameter: this.product })
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


          this.http.get('http://localhost:3000/changeproductpic?url=' + this.downloadURL + '&productID=' + this.product.product_id).subscribe(
            result => {
              console.log(result);


              this.product.photo_url = this.downloadURL;

            },
            err => {
              console.log(err);
            }
          )
          console.log(this.downloadURL);
        }).catch(err => {
          console.log(err);
        });
      }
    )

  }




  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Experience successfully removed',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();

  }



}





