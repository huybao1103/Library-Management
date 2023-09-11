import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInfoEditComponent } from './book-info.edit.component';

describe('BookInfoEditComponent', () => {
  let component: BookInfoEditComponent;
  let fixture: ComponentFixture<BookInfoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookInfoEditComponent]
    });
    fixture = TestBed.createComponent(BookInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
