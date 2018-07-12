import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { RegistrationPage } from '../pages/registration/registration';
import { ProductsPage } from '../pages/products/products';
import { ProductPage } from '../pages/product/product';
import { ProductService } from '../services/product.service';
import { PaymentPage } from '../pages/payment/payment';
import { HistoryPage } from '../pages/history/history';
import { FormsModule } from '@angular/forms';
import { AddproductPage } from '../pages/addproduct/addproduct';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    RegistrationPage,
    ProductsPage,
    ProductPage,
    PaymentPage,
    HistoryPage,
    AddproductPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    RegistrationPage,
    ProductsPage,
    ProductPage,
    PaymentPage,
    HistoryPage,
    AddproductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ProductService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
