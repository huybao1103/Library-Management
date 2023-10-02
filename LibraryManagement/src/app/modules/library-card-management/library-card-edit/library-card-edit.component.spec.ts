import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryCardEditComponent } from './library-card-edit.component';

describe('LibraryCardEditComponent', () => {
  let component: LibraryCardEditComponent;
  let fixture: ComponentFixture<LibraryCardEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryCardEditComponent]
    });
    fixture = TestBed.createComponent(LibraryCardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
