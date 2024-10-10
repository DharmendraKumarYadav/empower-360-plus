import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { LoginResponse, IdToken } from '../model/login-response.model';
import { PermissionValues } from '../model/permission.model';
import { User } from '../model/user.model';
import { JwtHelper } from './jwt-helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token: any;
  constructor(private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService, ) { }

  login(email: string, password: string) {

    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    let params = new HttpParams()
      .append('username', email)
      .append('password', password)
      .append('grant_type', 'password')
      .append('scope', 'openid email phone profile offline_access roles')
      .append('resource', window.location.origin);

    let requestBody = params.toString();

    return this.http.post<LoginResponse>(this.env.API_URL + 'connect/token', requestBody, { headers: header }).pipe(
      tap(
        response => this.processLoginResponse(response)
      ),
    );
  }
  private processLoginResponse(response: LoginResponse) {

    let accessToken = response.access_token;

    if (accessToken == null)
      throw new Error("Received accessToken was empty");

    let idToken = response.id_token;
    let refreshToken = response.refresh_token;
    let expiresIn = response.expires_in;

    let tokenExpiryDate = new Date();
    tokenExpiryDate.setSeconds(tokenExpiryDate.getSeconds() + expiresIn);

    let accessTokenExpiry = tokenExpiryDate;

    let jwtHelper = new JwtHelper();
    let decodedIdToken = <IdToken>jwtHelper.decodeToken(response.id_token);

    let permissions: PermissionValues[] = Array.isArray(decodedIdToken.permission) ? decodedIdToken.permission : [decodedIdToken.permission];

    let user = new User(
      decodedIdToken.sub,
      decodedIdToken.name,
      decodedIdToken.fullname,
      decodedIdToken.email,
      decodedIdToken.phone,
      Array.isArray(decodedIdToken.role) ? decodedIdToken.role : [decodedIdToken.role], decodedIdToken.type);
    user.isEnabled = true;
    this.saveUserDetails(user, permissions, accessToken, idToken, refreshToken, accessTokenExpiry);

    return user;
  }


  private saveUserDetails(user: User, permissions: PermissionValues[], accessToken: string, idToken: string, refreshToken: string, expiresIn: Date) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("name", user.fullName);
    this.storage.setItem("name", user.fullName);
    this.storage.setItem("userId", accessToken);
    this.storage.setItem("accessToken", accessToken);
    this.storage.setItem("idToken", idToken);
    this.storage.setItem("refreshToken", refreshToken);
    this.storage.setItem("expiresIn", expiresIn);
    this.storage.setItem("permissions", permissions);
    this.storage.setItem("user", user);
    this.isLoggedIn = true;
    this.token = accessToken;


  }

  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"] + " " + this.token["access_token"]
    });
    return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
      .pipe(
        tap(data => {
          this.storage.remove("token");
          this.isLoggedIn = false;
          delete this.token;
          return data;
        })
      )
  }
  getToken() {
    return this.storage.getItem('accessToken').then(
      data => {
        this.token = data;
        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }
  getCurrentUser(): any  {
    //check for browser
    var userId = localStorage.getItem("userId");
    if (userId != null) {
      return userId;
    } else {

      //Return Login Page
    }
    // return this.storage.getItem('userId').then(
    //   (data) => {
    //     console.log(data);
    //    return data;
    //   },
    //   error => {
    //      //Return Login Page
    //   }
    // );
  }

  checkLogin() {
    //check for browser
    // var token = localStorage.getItem("accessToken");
    // if (token != null) {
    //   return true;
    // } else {

    //   return false;
    // }
    return this.storage.getItem('accessToken').then(
      data => {
       return true;
      },
      error => {
        return false;
      }
    );
  }
}
