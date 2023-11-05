import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMainPageComponent } from './reader-main-page.component';

describe('StudentMainPageComponent', () => {
  let component: StudentMainPageComponent;
  let fixture: ComponentFixture<StudentMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentMainPageComponent]
    });
    fixture = TestBed.createComponent(StudentMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
