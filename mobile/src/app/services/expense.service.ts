import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnvService } from './env.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private token: string;
  constructor(private http: HttpClient, private storage: NativeStorage,
    private env: EnvService) { }

    private readonly _getExpenseBookingDashboardUrl: string = "/api/ExpenseBooking/dashboard";
    private readonly _getAllExpenseBookingUrl: string = "/api/ExpenseBooking/list";
    private readonly _getEmployeeRequestUrl: string = "/api/ExpenseBooking/requestList";
    private readonly _getApproveListUrl: string = "/api/ExpenseBooking/approveList";
    private readonly _getAllApproveListUrl: string = "/api/ExpenseBooking/allapproveList";
    private readonly _getApproveListManagerExcelUrl: string = "/api/ExpenseBooking/approvedmanager";
    private readonly _getApproveListAllExcelUrl: string = "/api/ExpenseBooking/approvedall";
    private readonly _getAddRequestUrl: string = "/api/ExpenseBooking/getNewRequest";
    private readonly _addRequestUrl: string = "/api/ExpenseBooking/addRequest";
    private readonly _updateRequestUrl: string = "/api/ExpenseBooking/update";
    private readonly _viewRequestUrl: string = "/api/ExpenseBooking/ViewRequestApprover";
    
    private readonly _approveRejectUrl: string = "/api/ExpenseBooking/approveReject";
    private readonly _inviteApproveRejectUrl: string = "/api/ExpenseBooking/inviteApproveReject";
    private readonly _deleteDocumentUrl: string = "/api/ExpenseBooking/deletedocument";
  
  
    private readonly _inviteApproverUrl: string = "/api/ExpenseBooking/inviteApprover";
    private readonly _submitRequestUrl: string = "/api/ExpenseBooking/submitRequest";
    private readonly _deleteRequestUrl: string = "/api/ExpenseBooking/deleteRequest";
 

    private readonly _getSubCategoryUrl: string = "/api/ExpenseSubCategoryItem/getSubCategory";
    private readonly _getItemUrl: string = "/api/ExpenseBooking/getItem";

 
  
  

    private get getSubCategoryUrl() { return this.env.API_URL + this._getSubCategoryUrl; }
    private get getItemUrl() { return this.env.API_URL + this._getItemUrl; }

  
    private get getExpenseBookingDashboardUrl() { return this.env.API_URL + this._getExpenseBookingDashboardUrl; }
    private get getAllExpenseBookingUrl() { return this.env.API_URL + this._getAllExpenseBookingUrl; }
    private get getEmployeeRequestUrl() { return this.env.API_URL + this._getEmployeeRequestUrl; }
    private get getApproveListUrl() { return this.env.API_URL + this._getApproveListUrl; }
    private get getAllApproveListUrl() { return this.env.API_URL + this._getAllApproveListUrl; }
  
  
    private get getApproveListManagerExcelUrl() { return this.env.API_URL + this._getApproveListManagerExcelUrl; }
    private get getApprovedAllExcelUrl() { return this.env.API_URL + this._getApproveListAllExcelUrl; }
  
    private get getAddRequestUrl() { return this.env.API_URL + this._getAddRequestUrl; }
    private get addRequestUrl() { return this.env.API_URL + this._addRequestUrl; }
    private get updateRequestUrl() { return this.env.API_URL + this._updateRequestUrl; }
    private get viewRequestUrl() { return this.env.API_URL + this._viewRequestUrl; }
    private get inviteApproverUrl() { return this.env.API_URL + this._inviteApproverUrl; }
    private get approveRejectUrl() { return this.env.API_URL + this._approveRejectUrl; }
    private get inviteApproveRejectUrl() { return this.env.API_URL + this._inviteApproveRejectUrl; }
    private get submitRequestUrl() { return this.env.API_URL + this._submitRequestUrl; }
    private get deleteRequestUrl() { return this.env.API_URL + this._deleteRequestUrl; }
    private get deleteDocumentUrl() { return this.env.API_URL + this._deleteDocumentUrl; }


    getExpenseBookingDasboard(userId:string) {
      let endpointUrl = `${this.getExpenseBookingDashboardUrl}/${userId}`;
      return this.http.get(endpointUrl, this.getRequestHeaders());
    }
  
    getAllExpenseBooking() {
      let endpointUrl = `${this.getAllExpenseBookingUrl}`;
      return this.http.get(endpointUrl, this.getRequestHeaders());
    }
  
    getEmployeeRequest(status:string,id?: string, page?: number, pageSize?: number, name?: string) {
      let endpointUrl = `${this.getEmployeeRequestUrl}/${id}/${status}/${page}/${pageSize}/${name}`;
      return this.http.get(endpointUrl, this.getRequestHeaders());
    }
  
    getApproveList(id?: string, page?: number, pageSize?: number, name?: string) {
      let endpointUrl = `${this.getApproveListUrl}/${id}/${page}/${pageSize}/${name}`;
      return this.http.get(endpointUrl, this.getRequestHeaders());
    }
  
    getAllApproveList(id?: string, page?: number, pageSize?: number, name?: string) {
      let endpointUrl = `${this.getAllApproveListUrl}/${id}/${page}/${pageSize}/${name}`;
      return this.http.get(endpointUrl, this.getRequestHeaders());
    }
  
  
    getApprovedExcelManager(id?: string) {
      let endpointUrl = `${this.getApproveListManagerExcelUrl}/${id}`;
      return this.http.get(endpointUrl, this.getRequestHeaders());
    }
    getApprovedAllExcel() {
      let endpointUrl = `${this.getApprovedAllExcelUrl}`;
      return this.http.get(endpointUrl, this.getRequestHeaders());
    }
  
    // getAddRequest(id?: string) {
    //   let endpointUrl = `${this.getAddRequestUrl}/${id}`;
    //   return this.http.get(endpointUrl, this.getRequestHeaders());
    // }

    getNewRequest(id?: string) {
      let endpointUrl = `${this.getAddRequestUrl}`;
      return this.http.get(endpointUrl, this.getRequestHeaders());
    }

    addRequest(request: any, id?: string) {
      let endpointUrl = `${this.addRequestUrl}/${id}`;
      console.log(endpointUrl);
      console.log(JSON.stringify(request));
      return this.http.post(endpointUrl, JSON.stringify(request), this.getRequestHeaders());
    }
    updateRequest(request: any, id?: string) {
      let endpointUrl = id ? `${this.updateRequestUrl}/${id}` : this.updateRequestUrl;
      return this.http.put(endpointUrl, JSON.stringify(request), this.getRequestHeaders());
    }
  
    viewRequest(id?: string) {
      let endpointUrl = `${this.viewRequestUrl}/${id}`;
      return this.http.get(endpointUrl, this.getRequestHeaders());
    }
  
    approveReject(approve: any, id?: string) {
      let endpointUrl = `${this.approveRejectUrl}/${id}`;
      return this.http.put(endpointUrl, JSON.stringify(approve), this.getRequestHeaders());
    }
    inviteApproveReject(approve: any, id?: string, employeeId?: string) {
      let endpointUrl = `${this.inviteApproveRejectUrl}/${id}/${employeeId}`;
      return this.http.put(endpointUrl, JSON.stringify(approve), this.getRequestHeaders());
    }
    inviteApprover(invite: any, id?: string) {
      let endpointUrl = `${this.inviteApproverUrl}/${id}`;
      return this.http.put(endpointUrl, JSON.stringify(invite), this.getRequestHeaders());
    }
  
    submitRequest(id?: string) {
      let endpointUrl = `${this.submitRequestUrl}/${id}`;
      return this.http.get(endpointUrl, this.getRequestHeaders());
    }
    delete(id?: string) {
      let endpoint = `${this.deleteRequestUrl}/${id}`
      return this.http.delete(endpoint, this.getRequestHeaders());
    }
    deleteDocument(id?: string) {
      let endpoint = `${this.deleteDocumentUrl}/${id}`
      return this.http.delete(endpoint, this.getRequestHeaders());
    }
  
  
 
 
  

  
  
  
    /*Expense Item */
  
  
    getSubCategory(id?: string) {
      let endpointUrl = `${this.getSubCategoryUrl}/${id}`;
      return this.http.get(endpointUrl, this.getRequestHeaders());
    }
    getItems(id?: string) {
      let endpointUrl = `${this.getItemUrl}/${id}`;
      return this.http.get(endpointUrl, this.getRequestHeaders());
    }

    upload(formData: FormData,param:any) {
      const options = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
        }),
        params: new HttpParams().set('typeId', param.typeId)
      };
      return  this.http.post(this.env.API_URL+"/api/fileupload/create", formData, options);
    }

  protected getRequestHeaders(): { headers: HttpHeaders } {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
      'Content-Type': 'application/json',
      'Accept': `application/vnd.iman.v1+json, application/json, text/plain, */*`,
      'App-Version': "1.0"
    });

    return { headers: headers };
  }
  protected getToken() {
   let t=localStorage.getItem("accessToken");
    return this.storage.getItem('accessToken').then(
      data => {
        console.log("token");
        console.log(data);
        this.token = data;
      },
      error => {
        //Redirect to Login
      }
    );
  }

}
