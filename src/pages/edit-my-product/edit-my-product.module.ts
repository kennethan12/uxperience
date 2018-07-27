import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditMyProductPage } from './edit-my-product';

@NgModule({
  declarations: [
    EditMyProductPage,
  ],
  imports: [
    IonicPageModule.forChild(EditMyProductPage),
  ],
})
export class EditMyProductPageModule {}
