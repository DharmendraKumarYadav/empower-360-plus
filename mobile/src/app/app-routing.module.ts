import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'expense-dashboard', loadChildren: './expense-dashboard/expense-dashboard.module#ExpenseDashboardPageModule' , canActivate: [AuthGuard] },
  { path: 'book-expense', loadChildren: './book-expense/book-expense.module#BookExpensePageModule' , canActivate: [AuthGuard] },
  { path: 'saved', loadChildren: './saved/saved.module#SavedPageModule', canActivate: [AuthGuard] },
  { path: 'submit', loadChildren: './submit/submit.module#SubmitPageModule' , canActivate: [AuthGuard]},
  { path: 're-submit', loadChildren: './re-submit/re-submit.module#ReSubmitPageModule' , canActivate: [AuthGuard]},
  { path: 'approved', loadChildren: './approved/approved.module#ApprovedPageModule' , canActivate: [AuthGuard]},
  { path: 'rejected', loadChildren: './rejected/rejected.module#RejectedPageModule' , canActivate: [AuthGuard]},
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' , canActivate: [AuthGuard]},
  { path: 'approve-expense-booking', loadChildren: './approve-expense-booking/approve-expense-booking.module#ApproveExpenseBookingPageModule' , canActivate: [AuthGuard]},
  { path: 'approve-expense-booking-detail', loadChildren: './approve-expense-booking-detail/approve-expense-booking-detail.module#ApproveExpenseBookingDetailPageModule' , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
