import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDistributorsComponent } from './details-distributors.component';

describe('DetailsDistributorsComponent', () => {
  let component: DetailsDistributorsComponent;
  let fixture: ComponentFixture<DetailsDistributorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsDistributorsComponent]
    });
    fixture = TestBed.createComponent(DetailsDistributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
