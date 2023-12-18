import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTestimoniosComponent } from './info-testimonios.component';

describe('InfoTestimoniosComponent', () => {
  let component: InfoTestimoniosComponent;
  let fixture: ComponentFixture<InfoTestimoniosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoTestimoniosComponent]
    });
    fixture = TestBed.createComponent(InfoTestimoniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
