import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ExpenseService } from '../services/expense.service';
import { LoadingService } from '../services/loading.service';
import { ExpenseBookingModel } from '../model/expense-booking-request.model';
import { DropDownList } from '../model/dropdown';
import { AlertService } from '../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { AlertController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { concat } from 'rxjs';

export interface Deparment {
  value: string;
  viewValue: string;
}
export interface Item {
  value: string;
  viewValue: string;
}
export interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-book-expense',
  templateUrl: './book-expense.page.html',
  styleUrls: ['./book-expense.page.scss'],
})
export class BookExpensePage implements OnInit {
  public fileTransfer: FileTransferObject = this.transfer.create();
  public items: any = [];
  itemList: DropDownList[] = [];
  departmentList: DropDownList[] = [];
  public isSaving = false;
  public expanseTitle: string = "Add Expense Booking";
  public isSubmitting = false;
  public requestEdit: ExpenseBookingModel = new ExpenseBookingModel();
  loadingIndicator: boolean = true;
  public fileUploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;
  public fileId: string[] = new Array<string>();
  public categeoryList: DropDownList[] = [];
  public subCategeoryList: DropDownList[] = [];
  public selectedCategory: string;
  public selectedSubCategory: string;
  public selectedItem: string;
  constructor(private alertController: AlertController,public authService:AuthService,private transfer: FileTransfer, private file: File,public alertService: AlertService, private router: Router, private route: ActivatedRoute, private expenseBookingService: ExpenseService, public loading: LoadingService) {
    this.loading.present();
    this.route.queryParams.subscribe(params => {
      if (params['requestId']) {
        this.expanseTitle = "View Expense Booking";
        this.expenseBookingService.viewRequest(params['requestId']).subscribe(result => this.onSuccessfulDataLoadRequest(result), error => this.onDataLoadFailedRequest(error));
      }
      else {
        this.expenseBookingService.getNewRequest().subscribe(result => this.onSuccessfulDataLoadRequest(result), error => this.onDataLoadFailedRequest(error));
      }
    });

   }


  ngOnInit() {
    //this.getExpenseBooking();
  }

  // getExpenseBooking() {
  //   this.loading.present();
  //   this.expenseBookingService.getNewRequest().subscribe(result => this.onSuccessfulDataLoadRequest(result), error => this.onDataLoadFailedRequest(error));
  // }
  onSuccessfulDataLoadRequest(request: any) {
    console.log("Request");
    console.log(request);

    this.requestEdit = request;
     this.items = request.expenseBookingDetail;
    console.log(this.requestEdit);
    if (this.requestEdit.toDate.toString() == "0001-01-01T00:00:00") {
      this.requestEdit.toDate = null;
    }
    if (this.requestEdit.fromDate.toString() == "0001-01-01T00:00:00") {
      this.requestEdit.fromDate = null;
    }
 
    this.categeoryList = request.categoryList;
    this.departmentList = request.departmentList;
    this.subCategeoryList=request.subCategoryList;
    this.itemList=request.subCategoryItems;
    this.selectedCategory=request.categoryId;
    this.selectedSubCategory=request.subCategoryId;
    this.loading.dismiss();
  }
  onDataLoadFailedRequest(error: any) {
    this.loading.dismiss();
  }

  getSubCategory(id: any) {
    this.loading.present();
    this.expenseBookingService.getSubCategory(id).subscribe(result => this.onSuccessfulDataLoadSubCategory(result), error => this.onDataLoadFailedSubCategory(error));

  }
  onSuccessfulDataLoadSubCategory(request: any) {
    this.subCategeoryList = request;
    this.loading.dismiss();
  }
  onDataLoadFailedSubCategory(error: any) {
    this.loading.dismiss();
  }
  getItemList(id: any) {
    this.loading.present();
    this.expenseBookingService.getItems(id).subscribe(result => this.onSuccessfulDataLoadItemList(result), error => this.onDataLoadFailedItemList(error));
  }
  onSuccessfulDataLoadItemList(request: any) {
    this.itemList = request;
    this.loading.dismiss();
  }
  onDataLoadFailedItemList(error: any) {
    this.loading.dismiss();
  }
  Save(){

    let todate = new Date(this.requestEdit.toDate);
    let fromdate = new Date(this.requestEdit.fromDate);
    if (fromdate > todate) {
      //"From date should not be greater than to date.");
    } else {
      this.loading.present();
      this.requestEdit.file = this.fileId;
      console.log("Form");
      console.log(this.requestEdit);
      if (this.requestEdit.id == null) {
        this.requestEdit.fromDate = this.convert(this.requestEdit.fromDate);
        this.requestEdit.toDate = this.convert(this.requestEdit.toDate);
        let userId=this.authService.getCurrentUser();
        this.expenseBookingService.addRequest(this.requestEdit, userId).subscribe(sucess => this.saveSuccessHelper(sucess), error => this.saveFailedHelper(error));
      }
      else {
        this.requestEdit.fromDate = this.convert(this.requestEdit.fromDate);
        this.requestEdit.toDate = this.convert(this.requestEdit.toDate);
        this.expenseBookingService.updateRequest(this.requestEdit, this.requestEdit.id).subscribe(sucess => this.saveSuccessHelper(sucess), error => this.saveFailedHelper(error));
      }
    }

  }
  Submit() {
    if (this.requestEdit.id != null) {
      this.loading.present();
      this.expenseBookingService.submitRequest(this.requestEdit.id).subscribe(sucess => this.submitSuccessHelper(sucess), error => this.submitFailedHelper(error));
    } else {
      this.alertService.presentToast("Save data first");
    }

  }
  submitSuccessHelper(result?: any) {
    this.router.navigateByUrl('/submit');
    this.loading.dismiss();

  }
  private submitFailedHelper(error: any) {
    this.loading.dismiss();
    this.alertService.presentToast("Save data first");
  }
  private saveSuccessHelper(result?: any) {
    this.loading.dismiss();
    this.router.navigateByUrl('/saved');

  }
  private saveFailedHelper(error: any) {
    this.loading.dismiss();
    this.alertService.presentToast("Error occured");
  }
  getFiles(): FileLikeObject[] {
    return this.fileUploader.queue.map((fileItem) => {
      return fileItem.file;

    });
  }
  uploadFiles() {
    let files = this.getFiles();
    let requests = [];
    let formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file.rawFile, file.name);
    });
    this.loading.present();
    var parameters = {
      typeId: "1",
      userId: ""
    };
    this.expenseBookingService.upload(formData, parameters).subscribe(result => this.onSuccessfulFile(result), error => this.onFailedfile(error));
    concat(...requests).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  private onFailedfile(error: any) {
    this.loading.dismiss();
    this.alertService.presentToast("Error occured");
  }

  private onSuccessfulFile(result?: any) {
    result.forEach(item => {
      this.fileId.push(item.pictureId);
    });
    this.loading.dismiss();
  }
  download(document:any) {

    const url = 'http://empower360plus.net/';
    let path=`${url}/${document.fileUrl}`
    this.fileTransfer.download(path, this.file.externalApplicationStorageDirectory+document.fileName).then((entry) => {
      this.loading.dismiss();
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      this.loading.dismiss();
      console.log(error);
      this.alertService.presentToast("Unable to download file");
      // handle error
    });
  }

  deleteDocument(id:any){
    let deleteCategory =this.alertController.create({
      header:"Delete",
      message:"Are you sure you want to Delete?",
      buttons:[{
        text:"cancel"
      },
      {
        text:"Delete",
        handler: () => {
          this.loading.present();
          this.expenseBookingService.deleteDocument(id)
          .subscribe(results => {
            this.loading.dismiss();
            this.router.navigateByUrl('/expense-list');
          },
            error => {
              this.loading.dismiss();
            }); 
        }
      }]
    }).then(alert => alert.present())
  }
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  Test(){
    
  }
}