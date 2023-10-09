import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPeopleComponent } from './edit-people.component';

describe('EditPeopleComponent', () => {
  let component: EditPeopleComponent;
  let fixture: ComponentFixture<EditPeopleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPeopleComponent]
    });
    fixture = TestBed.createComponent(EditPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
