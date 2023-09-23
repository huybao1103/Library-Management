import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishersManagementComponent } from './publishers-management.component';

describe('PublishersManagementComponent', () => {
  let component: PublishersManagementComponent;
  let fixture: ComponentFixture<PublishersManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishersManagementComponent]
    });
    fixture = TestBed.createComponent(PublishersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
