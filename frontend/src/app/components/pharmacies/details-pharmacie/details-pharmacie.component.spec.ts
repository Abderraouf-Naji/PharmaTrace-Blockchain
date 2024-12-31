import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPharmacieComponent } from './details-pharmacie.component';

describe('DetailsPharmacieComponent', () => {
  let component: DetailsPharmacieComponent;
  let fixture: ComponentFixture<DetailsPharmacieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsPharmacieComponent]
    });
    fixture = TestBed.createComponent(DetailsPharmacieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
