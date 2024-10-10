import { Component, OnInit } from '@angular/core';
import { DropDownList } from 'src/app/model/dropdown';
import { ApproveRejectModel } from 'src/app/model/approve-reject.model';
import { ExpenseBookingModelDetail } from 'src/app/model/expense-booking-request.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AlertService } from 'src/app/services/alert.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-approve-expense-booking-detail',
  templateUrl: './approve-expense-booking-detail.page.html',
  styleUrls: ['./approve-expense-booking-detail.page.scss'],
})
export class ApproveExpenseBookingDetailPage implements OnInit {

  itemList: DropDownList[] = [];
  employeeList: DropDownList[] = [];
  departmentList: DropDownList[] = [];
  public approveReject: ApproveRejectModel = new ApproveRejectModel();
  public isSaving = false;
  public isSubmitting = false;
  public isInviteApproved: true;
  public requestEdit: ExpenseBookingModelDetail = new ExpenseBookingModelDetail();
  public fileTransfer: FileTransferObject = this.transfer.create();
  constructor(public alertService: AlertService,private router: Router,private transfer: FileTransfer, private file: File, private route: ActivatedRoute, private expenseBookingService: ExpenseService, public loading: LoadingService) {
    this.loading.present();
    this.route.queryParams.subscribe(params => {
      if (params['requestId']) {
        this.approveReject.id = params['requestId'];   
        this.expenseBookingService.viewRequest(params['requestId']).subscribe(result => this.onSuccessfulDataLoad(result), error => this.onDataLoadFailed(error));
      }
    });
  }

  public items: any = [];




  ngOnInit() {
  }
  onSuccessfulDataLoad(request: any) {
    this.requestEdit=request;
    this.items=request.expenseBookingDetail;
    this.itemList = request.subCategoryItems;
    this.departmentList = request.departmentList;
    this.employeeList = request.inviteEmployeeList;
    console.log(request);
    this.loading.dismiss();
  }

  onDataLoadFailed(error: any) {
    this.loading.dismiss();
  }
  onSave(id) {
    this.loading.present();
    this.approveReject.buttonType = id;
    this.expenseBookingService.approveReject(this.approveReject, this.requestEdit.approverId).subscribe(sucess => this.saveSuccessHelper(sucess,id), error => this.saveFailedHelper(error));
  }
  private saveSuccessHelper(result?: any,id?:number) {
    this.loading.dismiss();
    if(id==1)
    {
      this.alertService.successToast("Request approved successfully.");
    }else if(id==2){
      this.alertService.successToast("Request rejected successfully.");
    }else if(id==3){
      this.alertService.successToast("Request resubmitted successfully.");
    }

    this.router.navigateByUrl('/approve-expense-booking');
     //Approved /Resubmit or Reject Sucessfully
  
  }
  private saveFailedHelper(error: any) {
    this.alertService.presentToast("Please try later");
  //Approved /Resubmit or Reject Failed
  }

  invite() {
    console.log(this.requestEdit);
    this.loading.present();
    this.expenseBookingService.inviteApprover(this.requestEdit, this.requestEdit.approverId).subscribe(sucess => this.saveInviteSuccessHelper(sucess), error => this.saveFailedInviteHelper(error));
  }
  private saveInviteSuccessHelper(result?: any) {
    this.loading.dismiss();
    this.alertService.successToast("Email sent successfully");
 //Invite Sucessfully

  }
  private saveFailedInviteHelper(error: any) {
    this.loading.dismiss();
    this.alertService.presentToast("Email could not sent");
    console.log(error);
  //Invite Failed
  }
  download(document:any) {

    const url = 'http://empower360plus.net/';
    let path=`${url}/${document.fileUrl}`
    this.fileTransfer.download(path, this.file.dataDirectory +document.fileName).then((entry) => {
      this.loading.dismiss();
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      this.loading.dismiss();
      console.log(error);
      this.alertService.presentToast("Unable to download file");
      // handle error
    });
  }

}
