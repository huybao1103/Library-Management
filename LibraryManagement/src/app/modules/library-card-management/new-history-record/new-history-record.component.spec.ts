import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHistoryRecordComponent } from './new-history-record.component';

describe('NewHistoryRecordComponent', () => {
  let component: NewHistoryRecordComponent;
  let fixture: ComponentFixture<NewHistoryRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewHistoryRecordComponent]
    });
    fixture = TestBed.createComponent(NewHistoryRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
