import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDistributorsComponent } from './edit-distributors.component';

describe('EditDistributorsComponent', () => {
  let component: EditDistributorsComponent;
  let fixture: ComponentFixture<EditDistributorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDistributorsComponent]
    });
    fixture = TestBed.createComponent(EditDistributorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
