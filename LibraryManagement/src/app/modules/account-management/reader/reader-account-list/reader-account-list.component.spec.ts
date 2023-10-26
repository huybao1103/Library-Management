import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderAccountListComponent } from './reader-account-list.component';

describe('ReaderAccountListComponent', () => {
  let component: ReaderAccountListComponent;
  let fixture: ComponentFixture<ReaderAccountListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReaderAccountListComponent]
    });
    fixture = TestBed.createComponent(ReaderAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
