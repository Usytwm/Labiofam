import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBioproductComponent } from './card-bioproduct.component';

describe('CardBioproductComponent', () => {
  let component: CardBioproductComponent;
  let fixture: ComponentFixture<CardBioproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardBioproductComponent]
    });
    fixture = TestBed.createComponent(CardBioproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
