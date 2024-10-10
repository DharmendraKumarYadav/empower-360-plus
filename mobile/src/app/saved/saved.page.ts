import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ExpenseBookingListModel } from '../model/expense-booking-request.model';
import { AuthService } from '../services/auth.service';
import { ExpenseService } from '../services/expense.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {
  public items: any = [];
  public  bookingRequest: ExpenseBookingListModel;
  constructor(public alertController: AlertController,public authService:AuthService,private expenseBookingService: ExpenseService, public loading: LoadingService) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          cssClass: 'alertDanger',
          handler: () => {
            console.log('Delete clicked');
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getEmployeeRequest(0, 1000, "");
}
  getEmployeeRequest(page?: number, pageSize?: number, name?: string) {
    this.loading.present();
    let userId=this.authService.getCurrentUser();
    this.expenseBookingService.getEmployeeRequest("0",userId, page, pageSize, name).subscribe(result => this.onSuccessfulDataLoad(result), error => this.onDataLoadFailed(error));
  }


  onSuccessfulDataLoad(request: any) {
    this.items = request.expenseBookingListModel;
    console.log(request.expenseBookingListModel);
    this.loading.dismiss();
    // this.rows = request.expenseBookingListModel; 
    // this.count = request.expenseBookingCount;
  }

  onDataLoadFailed(error: any) {
    this.loading.dismiss();
  }
  Submit(id) {
      this.loading.present();
      this.expenseBookingService.submitRequest(id).subscribe(sucess => this.submitSuccessHelper(sucess), error => this.submitFailedHelper(error));
  }
  submitSuccessHelper(result?: any) {
    this.loading.dismiss();

  }
  private submitFailedHelper(error: any) {
    this.loading.dismiss();
  }

}
