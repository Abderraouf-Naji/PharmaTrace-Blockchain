import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVerificationComponent } from './product-verification.component';

describe('ProductVerificationComponent', () => {
  let component: ProductVerificationComponent;
  let fixture: ComponentFixture<ProductVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductVerificationComponent]
    });
    fixture = TestBed.createComponent(ProductVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
