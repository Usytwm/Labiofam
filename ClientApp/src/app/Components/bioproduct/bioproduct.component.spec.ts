import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioproductComponent } from './bioproduct.component';

describe('BioproductComponent', () => {
  let component: BioproductComponent;
  let fixture: ComponentFixture<BioproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BioproductComponent]
    });
    fixture = TestBed.createComponent(BioproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
