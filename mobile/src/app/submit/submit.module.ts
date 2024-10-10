import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SubmitPage } from './submit.page';
import { MatToolbarModule } from '@angular/material';
import { DemoMaterialModule } from 'src/material-module';

const routes: Routes = [
  {
    path: '',
    component: SubmitPage
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
  declarations: [SubmitPage]
})
export class SubmitPageModule {}
