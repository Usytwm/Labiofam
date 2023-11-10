import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioproductosComponent } from './bioproductos.component';

describe('BioproductosComponent', () => {
  let component: BioproductosComponent;
  let fixture: ComponentFixture<BioproductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BioproductosComponent]
    });
    fixture = TestBed.createComponent(BioproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
