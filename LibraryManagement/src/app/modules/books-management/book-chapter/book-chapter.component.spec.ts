import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookChapterComponent } from './book-chapter.component';

describe('BookChapterComponent', () => {
  let component: BookChapterComponent;
  let fixture: ComponentFixture<BookChapterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookChapterComponent]
    });
    fixture = TestBed.createComponent(BookChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
