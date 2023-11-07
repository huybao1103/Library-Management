import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAccountPanelComponent } from './employee-account-panel.component';

describe('EmployeeAccountPanelComponent', () => {
  let component: EmployeeAccountPanelComponent;
  let fixture: ComponentFixture<EmployeeAccountPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeAccountPanelComponent]
    });
    fixture = TestBed.createComponent(EmployeeAccountPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
