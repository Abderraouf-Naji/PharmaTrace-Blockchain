import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPharmaciesComponent } from './list-pharmacies.component';

describe('ListPharmaciesComponent', () => {
  let component: ListPharmaciesComponent;
  let fixture: ComponentFixture<ListPharmaciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPharmaciesComponent]
    });
    fixture = TestBed.createComponent(ListPharmaciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
