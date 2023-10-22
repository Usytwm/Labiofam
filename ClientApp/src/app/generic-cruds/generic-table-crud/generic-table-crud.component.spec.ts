import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericTableCrudComponent } from './generic-table-crud.component';

describe('GenericTableCrudComponent', () => {
  let component: GenericTableCrudComponent;
  let fixture: ComponentFixture<GenericTableCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericTableCrudComponent]
    });
    fixture = TestBed.createComponent(GenericTableCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
