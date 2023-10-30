import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsOfSalesComponent } from './points-of-sales.component';

describe('PointsOfSalesComponent', () => {
  let component: PointsOfSalesComponent;
  let fixture: ComponentFixture<PointsOfSalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointsOfSalesComponent]
    });
    fixture = TestBed.createComponent(PointsOfSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
