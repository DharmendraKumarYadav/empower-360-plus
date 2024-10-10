import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExpenseDashboardPage } from './expense-dashboard.page';
import { MatToolbar, MatToolbarModule, MatCardModule, MatGridListModule } from '@angular/material';
import { DemoMaterialModule } from 'src/material-module';

const routes: Routes = [
  {
    path: '',
    component: ExpenseDashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    DemoMaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExpenseDashboardPage]
})
export class ExpenseDashboardPageModule {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
}
