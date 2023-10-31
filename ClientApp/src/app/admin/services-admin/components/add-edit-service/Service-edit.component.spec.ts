import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Services_EditComponent } from './Service-edit.component';

describe('Services_EditComponent', () => {
  let component: Services_EditComponent;
  let fixture: ComponentFixture<Services_EditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Services_EditComponent]
    });
    fixture = TestBed.createComponent(Services_EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
