import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveExpenseBookingPage } from './approve-expense-booking.page';

describe('ApproveExpenseBookingPage', () => {
  let component: ApproveExpenseBookingPage;
  let fixture: ComponentFixture<ApproveExpenseBookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveExpenseBookingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveExpenseBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
