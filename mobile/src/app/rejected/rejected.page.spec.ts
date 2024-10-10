import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedPage } from './rejected.page';

describe('RejectedPage', () => {
  let component: RejectedPage;
  let fixture: ComponentFixture<RejectedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
