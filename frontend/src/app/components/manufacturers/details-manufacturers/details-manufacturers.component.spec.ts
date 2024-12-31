import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsManufacturersComponent } from './details-manufacturers.component';

describe('DetailsManufacturersComponent', () => {
  let component: DetailsManufacturersComponent;
  let fixture: ComponentFixture<DetailsManufacturersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsManufacturersComponent]
    });
    fixture = TestBed.createComponent(DetailsManufacturersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
