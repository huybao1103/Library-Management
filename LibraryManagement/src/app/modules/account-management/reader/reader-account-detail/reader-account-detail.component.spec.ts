import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderAccountDetailComponent } from './reader-account-detail.component';

describe('ReaderAccountDetailComponent', () => {
  let component: ReaderAccountDetailComponent;
  let fixture: ComponentFixture<ReaderAccountDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReaderAccountDetailComponent]
    });
    fixture = TestBed.createComponent(ReaderAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
