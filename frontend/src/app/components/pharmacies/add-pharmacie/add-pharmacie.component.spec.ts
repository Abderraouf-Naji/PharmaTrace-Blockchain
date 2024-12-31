import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpharmacieComponent } from './add-pharmacie.component';

describe('AddpharmacieComponent', () => {
  let component: AddpharmacieComponent;
  let fixture: ComponentFixture<AddpharmacieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddpharmacieComponent]
    });
    fixture = TestBed.createComponent(AddpharmacieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
