import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditServiceComponent } from './Service-edit.component';

describe('AddEditServiceComponent', () => {
  let component: AddEditServiceComponent;
  let fixture: ComponentFixture<AddEditServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditServiceComponent]
    });
    fixture = TestBed.createComponent(AddEditServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
