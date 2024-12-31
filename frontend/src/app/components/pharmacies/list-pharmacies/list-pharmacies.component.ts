import { Component, OnInit } from '@angular/core';
import { Pharmacy } from 'src/app/models/Pharmacy';
import { PharmacyService } from 'src/app/services/pharmacy.service';

@Component({
  selector: 'app-list-pharmacies',
  templateUrl: './list-pharmacies.component.html',
  styleUrls: ['./list-pharmacies.component.css']
})
export class ListPharmaciesComponent implements OnInit {
  pharmacies: Pharmacy[] = [];

  constructor(private pharmacyService: PharmacyService) {}

  ngOnInit(): void {
    this.loadPharmacies();
  }

  loadPharmacies(): void {
    this.pharmacyService.getAll().subscribe((data) => {
      this.pharmacies = data;
    });
  }

  deletePharmacy(id: string): void {
    this.pharmacyService.delete(id).subscribe(() => {
      this.loadPharmacies(); // Refresh the list after deletion
    });
  }
}
