import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material';
import { DemoMaterialModule } from 'src/material-module';
import { IonicModule } from '@ionic/angular';

import { ApproveExpenseBookingPage } from './approve-expense-booking.page';

const routes: Routes = [
  {
    path: '',
    component: ApproveExpenseBookingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatToolbarModule,
    DemoMaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ApproveExpenseBookingPage]
})
export class ApproveExpenseBookingPageModule {}
