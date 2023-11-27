import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioproductListComponent } from './bioproduct-list.component';

describe('BioproductListComponent', () => {
  let component: BioproductListComponent;
  let fixture: ComponentFixture<BioproductListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BioproductListComponent]
    });
    fixture = TestBed.createComponent(BioproductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
