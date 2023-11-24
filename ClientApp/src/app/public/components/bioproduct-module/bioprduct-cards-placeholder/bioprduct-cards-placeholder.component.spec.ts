import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioprductCardsPlaceholderComponent } from './bioprduct-cards-placeholder.component';

describe('BioprductCardsPlaceholderComponent', () => {
  let component: BioprductCardsPlaceholderComponent;
  let fixture: ComponentFixture<BioprductCardsPlaceholderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BioprductCardsPlaceholderComponent]
    });
    fixture = TestBed.createComponent(BioprductCardsPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
