import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { RegistrationPage } from '../pages/registration/registration';
import { ProductsPage } from '../pages/products/products';
import { FoodPage } from '../pages/food/food';
import { SurfingPage } from '../pages/surfing/surfing';
import { WinePage } from '../pages/wine/wine';
import { YogaPage } from '../pages/yoga/yoga';
import { CapePointPage } from '../pages/capepoint/capepoint';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    RegistrationPage,
    ProductsPage,
    FoodPage,
    SurfingPage,
    WinePage,
    YogaPage,
    CapePointPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    RegistrationPage,
    ProductsPage,
    FoodPage,
    SurfingPage,
    WinePage,
    YogaPage,
    CapePointPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
