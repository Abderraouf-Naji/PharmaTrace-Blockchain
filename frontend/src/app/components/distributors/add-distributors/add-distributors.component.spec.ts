import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDistributorsComponent } from './add-distributors.component';

describe('AddDistributorsComponent', () => {
  let component: AddDistributorsComponent;
  let fixture: ComponentFixture<AddDistributorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDistributorsComponent]
    });
    fixture = TestBed.createComponent(AddDistributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
