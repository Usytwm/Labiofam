import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGenericComponent } from './add-edit-generic.component';

describe('AddEditGenericComponent', () => {
  let component: AddEditGenericComponent;
  let fixture: ComponentFixture<AddEditGenericComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditGenericComponent]
    });
    fixture = TestBed.createComponent(AddEditGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
