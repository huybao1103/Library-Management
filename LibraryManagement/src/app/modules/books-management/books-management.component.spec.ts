import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksManagementComponent } from './books-management.component';

describe('BooksManagementComponent', () => {
  let component: BooksManagementComponent;
  let fixture: ComponentFixture<BooksManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksManagementComponent]
    });
    fixture = TestBed.createComponent(BooksManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
