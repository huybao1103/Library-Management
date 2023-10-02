import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryCardManagementComponent } from './library-card-management.component';

describe('LibraryCardManagementComponent', () => {
  let component: LibraryCardManagementComponent;
  let fixture: ComponentFixture<LibraryCardManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryCardManagementComponent]
    });
    fixture = TestBed.createComponent(LibraryCardManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
