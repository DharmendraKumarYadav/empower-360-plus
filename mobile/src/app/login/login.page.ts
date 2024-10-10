import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../model/login.model';
import { ModalController, NavController } from '@ionic/angular';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginModel: UserLogin = new UserLogin();

  constructor(private alertService: AlertService,
    private navCtrl: NavController,
    private modalController: ModalController,
    private authService: AuthService,
    public loading: LoadingService, ) { }

  ngOnInit() {
  }
  login() {
    this.loading.present();
    this.authService.login(this.loginModel.email, this.loginModel.password).subscribe(
      data => {
        //this.alertService.presentToast("Logged In");
      },
      error => {
        this.loading.dismiss();
        this.alertService.presentToast(error);
        this.alertService.presentToast("Please enter valid username and password");
      },
      () => {
        this.loading.dismiss();
        this.navCtrl.navigateRoot('/expense-dashboard');
      }
    );
  }

}
