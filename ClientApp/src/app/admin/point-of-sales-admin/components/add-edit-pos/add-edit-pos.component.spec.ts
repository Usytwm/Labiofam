import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPosComponent } from './add-edit-pos.component';

describe('AddEditPosComponent', () => {
  let component: AddEditPosComponent;
  let fixture: ComponentFixture<AddEditPosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditPosComponent]
    });
    fixture = TestBed.createComponent(AddEditPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
