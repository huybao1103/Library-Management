import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePermissionComponent } from './role-permission.component';

describe('RolePermissionComponent', () => {
  let component: RolePermissionComponent;
  let fixture: ComponentFixture<RolePermissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolePermissionComponent]
    });
    fixture = TestBed.createComponent(RolePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
