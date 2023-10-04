import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookChapterInfoEditComponent } from './book-chapter-info-edit.component';

describe('BookChapterInfoEditComponent', () => {
  let component: BookChapterInfoEditComponent;
  let fixture: ComponentFixture<BookChapterInfoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookChapterInfoEditComponent]
    });
    fixture = TestBed.createComponent(BookChapterInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
