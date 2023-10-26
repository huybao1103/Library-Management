import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAccountDetailComponent } from './employee-account-detail.component';

describe('EmployeeAccountDetailComponent', () => {
  let component: EmployeeAccountDetailComponent;
  let fixture: ComponentFixture<EmployeeAccountDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeAccountDetailComponent]
    });
    fixture = TestBed.createComponent(EmployeeAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
