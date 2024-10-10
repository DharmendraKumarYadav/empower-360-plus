import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SavedPage } from './saved.page';
import { DemoMaterialModule } from 'src/material-module';

const routes: Routes = [
  {
    path: '',
    component: SavedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemoMaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SavedPage]
})
export class SavedPageModule {}
