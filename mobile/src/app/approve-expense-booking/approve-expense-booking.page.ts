import { Component, OnInit } from '@angular/core';
import { ExpenseBookingListModel } from 'src/app/model/expense-booking-request.model';
import { ExpenseService } from 'src/app/services/expense.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-approve-expense-booking',
  templateUrl: './approve-expense-booking.page.html',
  styleUrls: ['./approve-expense-booking.page.scss'],
})
export class ApproveExpenseBookingPage implements OnInit {

  
  public items: any = [];
  bookingRequest:ExpenseBookingListModel;
  constructor(public authService:AuthService,private expenseBookingService: ExpenseService,  public loading: LoadingService) { }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.getApproveRequest(0, 1000, "");
}
  getApproveRequest(page?: number, pageSize?: number, name?: string) {
    this.loading.present();
    let userId=this.authService.getCurrentUser();
    this.expenseBookingService.getApproveList(userId, page, pageSize, name).subscribe(result => this.onSuccessfulDataLoad(result), error => this.onDataLoadFailed(error));
  }

  onSuccessfulDataLoad(request: any) {
    console.log("request");
    console.log(request);
    this.items=request.expenseBookingListModel;
    this.loading.dismiss();
  }

  onDataLoadFailed(error: any) {
    this.loading.dismiss();
  }


}
