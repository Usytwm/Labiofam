import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPeopleComponent } from './list-of-people.component';

describe('ListOfPeopleComponent', () => {
  let component: ListOfPeopleComponent;
  let fixture: ComponentFixture<ListOfPeopleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfPeopleComponent]
    });
    fixture = TestBed.createComponent(ListOfPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
