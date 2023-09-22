import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAuthorEditComponent } from './book-author-edit.component';

describe('BookAuthorEditComponent', () => {
  let component: BookAuthorEditComponent;
  let fixture: ComponentFixture<BookAuthorEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookAuthorEditComponent]
    });
    fixture = TestBed.createComponent(BookAuthorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
