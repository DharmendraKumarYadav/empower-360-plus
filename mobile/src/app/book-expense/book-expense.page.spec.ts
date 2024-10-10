import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookExpensePage } from './book-expense.page';

describe('BookExpensePage', () => {
  let component: BookExpensePage;
  let fixture: ComponentFixture<BookExpensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookExpensePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
