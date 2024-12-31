import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrScanComponent } from './qr-scan.component';

describe('QrScanComponent', () => {
  let component: QrScanComponent;
  let fixture: ComponentFixture<QrScanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrScanComponent]
    });
    fixture = TestBed.createComponent(QrScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
