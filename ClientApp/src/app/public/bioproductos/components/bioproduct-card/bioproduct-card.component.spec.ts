import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioproductCardComponent } from './bioproduct-card.component';

describe('BioproductCardComponent', () => {
  let component: BioproductCardComponent;
  let fixture: ComponentFixture<BioproductCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BioproductCardComponent]
    });
    fixture = TestBed.createComponent(BioproductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
