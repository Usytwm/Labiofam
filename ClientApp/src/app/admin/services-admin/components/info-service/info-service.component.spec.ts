import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoServiceComponent } from './info-service.component';

describe('InfoServiceComponent', () => {
  let component: InfoServiceComponent;
  let fixture: ComponentFixture<InfoServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoServiceComponent]
    });
    fixture = TestBed.createComponent(InfoServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
