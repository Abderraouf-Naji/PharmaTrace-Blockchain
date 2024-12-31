import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditManufacturersComponent } from './edit-manufacturers.component';

describe('EditManufacturersComponent', () => {
  let component: EditManufacturersComponent;
  let fixture: ComponentFixture<EditManufacturersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditManufacturersComponent]
    });
    fixture = TestBed.createComponent(EditManufacturersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
