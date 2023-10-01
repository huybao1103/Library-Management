import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPublisherEditComponent } from './book-publisher-edit.component';

describe('BookPublisherEditComponent', () => {
  let component: BookPublisherEditComponent;
  let fixture: ComponentFixture<BookPublisherEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookPublisherEditComponent]
    });
    fixture = TestBed.createComponent(BookPublisherEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
