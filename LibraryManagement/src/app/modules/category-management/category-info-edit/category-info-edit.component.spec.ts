import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryInfoEditComponent } from './category-info-edit.component';

describe('CategoryInfoEditComponent', () => {
  let component: CategoryInfoEditComponent;
  let fixture: ComponentFixture<CategoryInfoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryInfoEditComponent]
    });
    fixture = TestBed.createComponent(CategoryInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
