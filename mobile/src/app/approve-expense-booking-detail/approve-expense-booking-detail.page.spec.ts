import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveExpenseBookingDetailPage } from './approve-expense-booking-detail.page';

describe('ApproveExpenseBookingDetailPage', () => {
  let component: ApproveExpenseBookingDetailPage;
  let fixture: ComponentFixture<ApproveExpenseBookingDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveExpenseBookingDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveExpenseBookingDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
