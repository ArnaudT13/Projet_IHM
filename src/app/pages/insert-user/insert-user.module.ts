import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsertUserPageRoutingModule } from './insert-user-routing.module';

import { InsertUserPage } from './insert-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsertUserPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [InsertUserPage]
})
export class InsertUserPageModule {}
