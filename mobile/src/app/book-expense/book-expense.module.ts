import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { BookExpensePage } from './book-expense.page';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DemoMaterialModule } from 'src/material-module';
import { MatDatepickerModule } from '@angular/material';
import { FileUploadModule } from 'ng2-file-upload';

const routes: Routes = [
  {
    path: '',
    component: BookExpensePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    IonicModule,
    DemoMaterialModule,
    RouterModule.forChild(routes)
  ],
  providers: [  
    MatDatepickerModule,  FileTransfer,File
  ],
  declarations: [BookExpensePage]
})
export class BookExpensePageModule {}







