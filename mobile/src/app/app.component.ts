import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  name: string;
  public appPages = [
    {
      title: 'Dashboard',
      url: '/expense-dashboard',
      icon: 'grid'
    },
    {
      title: 'Expense Booking',
      url: '/book-expense',
      icon: 'wallet'
    },
    {
      title: 'Saved',
      url: '/saved',
      icon: 'bookmark'
    },
    {
      title: 'Submit',
      url: '/submit',
      icon: 'send'
    },
    {
      title: 'Re-Submit',
      url: '/re-submit',
      icon: 'refresh'
    },
    {
      title: 'Approved',
      url: '/approved',
      icon: 'checkmark'
    },
    {
      title: 'Rejected',
      url: '/rejected',
      icon: 'close'
    },
    // {
    //   title: 'Configuration',
    //   icon: 'settings',
    //   children: [
    //     {
    //       title: 'Expense Booking',
    //       icon: 'wallet',
    //       subchildren: [
    //         {
    //           title: 'Category',
    //           url: '/category',
    //           icon: 'list-box'
    //         },
    //         {
    //           title: 'Sub Category',
    //           url: '/sub-category',
    //           icon: 'list'
    //         },
    //         {
    //           title: 'Expense Item',
    //           url: '/expense-item',
    //           icon: 'cash'
    //         },
    //       ]
    //     },

    //   ]
    // },
    {
      title: 'Logout',
      url: '/login',
      icon: 'power'
    },
  ];
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: NativeStorage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  ngOnInit() {
    let userName = this.storage.getItem("name").then((data) => {
      if (data != null) {
        this.name = data;
      }
    });

  }
  ionViewWillEnter() {
    // let userName = localStorage.getItem("name");
    // if (userName != null) {
    //   this.name = userName;
    // }
    let userName = this.storage.getItem("name").then((data) => {
      if (data != null) {
        this.name = data;
      }
    });
  }
}
