import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericCreateCrudComponent } from './generic-create-crud.component';

describe('GenericCreateCrudComponent', () => {
  let component: GenericCreateCrudComponent;
  let fixture: ComponentFixture<GenericCreateCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericCreateCrudComponent]
    });
    fixture = TestBed.createComponent(GenericCreateCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
