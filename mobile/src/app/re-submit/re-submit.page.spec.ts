import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReSubmitPage } from './re-submit.page';

describe('ReSubmitPage', () => {
  let component: ReSubmitPage;
  let fixture: ComponentFixture<ReSubmitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReSubmitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReSubmitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
