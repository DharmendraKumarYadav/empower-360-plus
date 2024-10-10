import { Component, OnInit } from '@angular/core';

export interface Gender {
  value: string;
  viewValue: string;
}

export interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  genders: Gender[] = [
    {value: 'Male-0', viewValue: 'Male'},
    {value: 'Female-1', viewValue: 'Female'},
  ];

  Status: Status[] = [
    {value: 'Single-0', viewValue: 'Single'},
    {value: 'Married-1', viewValue: 'Married'},
  ];


  constructor() { }

  ngOnInit() {
  }

}
