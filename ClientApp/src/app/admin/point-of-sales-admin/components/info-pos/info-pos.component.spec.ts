import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPosComponent } from './info-pos.component';

describe('InfoPosComponent', () => {
  let component: InfoPosComponent;
  let fixture: ComponentFixture<InfoPosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoPosComponent]
    });
    fixture = TestBed.createComponent(InfoPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
