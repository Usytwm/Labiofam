import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioproductsAdminComponent } from './bioproducts-admin.component';

describe('BioproductsAdminComponent', () => {
  let component: BioproductsAdminComponent;
  let fixture: ComponentFixture<BioproductsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BioproductsAdminComponent]
    });
    fixture = TestBed.createComponent(BioproductsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
