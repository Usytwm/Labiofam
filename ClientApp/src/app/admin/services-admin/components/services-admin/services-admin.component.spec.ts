import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesAdminComponent } from './services-admin.component';

describe('ServicesAdminComponent', () => {
  let component: ServicesAdminComponent;
  let fixture: ComponentFixture<ServicesAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicesAdminComponent]
    });
    fixture = TestBed.createComponent(ServicesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
