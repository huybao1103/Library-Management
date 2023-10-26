import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAccountListComponent } from './employee-account-list.component';

describe('EmployeeAccountListComponent', () => {
  let component: EmployeeAccountListComponent;
  let fixture: ComponentFixture<EmployeeAccountListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeAccountListComponent]
    });
    fixture = TestBed.createComponent(EmployeeAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
