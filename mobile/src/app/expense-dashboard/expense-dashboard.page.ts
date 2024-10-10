import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ExpenseService } from '../services/expense.service';
import { LoadingService } from '../services/loading.service';
import { ExpenseBookingDashBoard } from '../model/expense-booking-dashboard.model';


@Component({
  selector: 'app-expense-dashboard',
  templateUrl: './expense-dashboard.page.html',
  styleUrls: ['./expense-dashboard.page.scss'],
})
export class ExpenseDashboardPage implements OnInit {

  public result: any;
  public dashBoard: ExpenseBookingDashBoard = new ExpenseBookingDashBoard()
  constructor(public authService: AuthService, private expenseBookingService: ExpenseService, public loading: LoadingService) { }

  ngOnInit() {
    this.getDashBoardData();
  }

  getDashBoardData() {
    this.loading.present();
    let userId = this.authService.getCurrentUser();
    this.expenseBookingService.getExpenseBookingDasboard(userId).subscribe(result => this.onSuccessfulDataLoad(result), error => this.onDataLoadFailed(error));
  }


  onSuccessfulDataLoad(request: any) {
    this.loading.dismiss();
    this.dashBoard = request;
  }

  onDataLoadFailed(error: any) {
    this.loading.dismiss();
  }

}
