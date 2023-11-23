import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTestimoniosComponent } from './testimonios-edit.component';

describe('AddEditTestimonioComponent', () => {
  let component: AddEditTestimoniosComponent;
  let fixture: ComponentFixture<AddEditTestimoniosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditTestimoniosComponent]
    });
    fixture = TestBed.createComponent(AddEditTestimoniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
