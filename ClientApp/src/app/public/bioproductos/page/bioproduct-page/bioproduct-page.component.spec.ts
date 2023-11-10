import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioproductPageComponent } from './bioproduct-page.component';

describe('BioproductPageComponent', () => {
  let component: BioproductPageComponent;
  let fixture: ComponentFixture<BioproductPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BioproductPageComponent]
    });
    fixture = TestBed.createComponent(BioproductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
