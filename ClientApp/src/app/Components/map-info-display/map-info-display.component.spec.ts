import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapInfoDisplayComponent } from './map-info-display.component';

describe('MapInfoDisplayComponent', () => {
  let component: MapInfoDisplayComponent;
  let fixture: ComponentFixture<MapInfoDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapInfoDisplayComponent]
    });
    fixture = TestBed.createComponent(MapInfoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
