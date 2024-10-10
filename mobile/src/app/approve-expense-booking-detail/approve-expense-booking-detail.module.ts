import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DemoMaterialModule } from 'src/material-module';
import { IonicModule } from '@ionic/angular';
import { MatDatepickerModule } from '@angular/material';
import { File } from '@ionic-native/file/ngx';

import { ApproveExpenseBookingDetailPage } from './approve-expense-booking-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ApproveExpenseBookingDetailPage
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
  providers: [  
    MatDatepickerModule,  FileTransfer,File
  ],
  declarations: [ApproveExpenseBookingDetailPage]
})
export class ApproveExpenseBookingDetailPageModule {}
