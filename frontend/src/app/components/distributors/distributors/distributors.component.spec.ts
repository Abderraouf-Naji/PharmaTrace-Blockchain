import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorsComponent } from './distributors.component';

describe('DistributorsComponent', () => {
  let component: DistributorsComponent;
  let fixture: ComponentFixture<DistributorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributorsComponent]
    });
    fixture = TestBed.createComponent(DistributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
