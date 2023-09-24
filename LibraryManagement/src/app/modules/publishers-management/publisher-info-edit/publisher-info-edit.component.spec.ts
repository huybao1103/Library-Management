import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherInfoEditComponent } from './publisher-info-edit.component';

describe('PublisherInfoEditComponent', () => {
  let component: PublisherInfoEditComponent;
  let fixture: ComponentFixture<PublisherInfoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublisherInfoEditComponent]
    });
    fixture = TestBed.createComponent(PublisherInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
