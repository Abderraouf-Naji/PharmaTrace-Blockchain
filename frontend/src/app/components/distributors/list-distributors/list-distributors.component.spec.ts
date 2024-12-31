import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDistributorsComponent } from './list-distributors.component';

describe('ListDistributorsComponent', () => {
  let component: ListDistributorsComponent;
  let fixture: ComponentFixture<ListDistributorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDistributorsComponent]
    });
    fixture = TestBed.createComponent(ListDistributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
