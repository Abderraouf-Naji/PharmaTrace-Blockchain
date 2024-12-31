import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPharmacieComponent } from './edit-pharmacie.component';

describe('EditPharmacieComponent', () => {
  let component: EditPharmacieComponent;
  let fixture: ComponentFixture<EditPharmacieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPharmacieComponent]
    });
    fixture = TestBed.createComponent(EditPharmacieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
