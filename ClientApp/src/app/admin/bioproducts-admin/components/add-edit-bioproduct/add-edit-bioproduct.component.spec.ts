import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBioproductComponent } from './add-edit-bioproduct.component';

describe('AddEditBioproductComponent', () => {
  let component: AddEditBioproductComponent;
  let fixture: ComponentFixture<AddEditBioproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditBioproductComponent]
    });
    fixture = TestBed.createComponent(AddEditBioproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
