import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library'; 


@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.component.html',
  styleUrls: ['./qr-scan.component.css']
})
export class QrScanComponent {
  isScanning: boolean = false; // État du scanner (si actif ou non)
  scanResult: string | null = null; // Résultat du scan QR Code

  // Définissez le format attendu comme un tableau de BarcodeFormat
  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];

  startScan(): void {
    this.isScanning = true; // Active le scanner
    this.scanResult = null; // Réinitialise le résultat précédent
  }

  onScanSuccess(result: string): void {
    this.isScanning = false; // Désactive le scanner après un succès
    this.scanResult = result; // Affiche le résultat du scan
  }
}