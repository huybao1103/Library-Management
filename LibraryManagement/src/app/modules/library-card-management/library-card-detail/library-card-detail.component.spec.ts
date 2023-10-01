import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryCardDetailComponent } from './library-card-detail.component';

describe('LibraryCardDetailComponent', () => {
  let component: LibraryCardDetailComponent;
  let fixture: ComponentFixture<LibraryCardDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryCardDetailComponent]
    });
    fixture = TestBed.createComponent(LibraryCardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
