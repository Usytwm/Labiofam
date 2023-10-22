import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDetailsCrudComponent } from './generic-details-crud.component';

describe('GenericDetailsCrudComponent', () => {
  let component: GenericDetailsCrudComponent;
  let fixture: ComponentFixture<GenericDetailsCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericDetailsCrudComponent]
    });
    fixture = TestBed.createComponent(GenericDetailsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
