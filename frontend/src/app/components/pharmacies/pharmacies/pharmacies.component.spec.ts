import { ComponentFixture, TestBed } from '@angular/core/testing';

import { pharmaciesComponent } from './pharmacies.component';

describe('pharmaciesComponent', () => {
  let component: pharmaciesComponent;
  let fixture: ComponentFixture<pharmaciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [pharmaciesComponent]
    });
    fixture = TestBed.createComponent(pharmaciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
