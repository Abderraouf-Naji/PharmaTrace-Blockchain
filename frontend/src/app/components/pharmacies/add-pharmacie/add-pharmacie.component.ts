import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PharmacyService } from 'src/app/services/pharmacy.service';

@Component({
  selector: 'app-add-pharmacie',
  templateUrl: './add-pharmacie.component.html',
  styleUrls: ['./add-pharmacie.component.css']
})
export class AddpharmacieComponent {
  pharmacy = {
    name: '',
    address: '',
    phone: '',
    email: '',
    pays:''
  };

  constructor(private pharmacyService: PharmacyService, private router: Router) {}

  onSubmit(): void {
    this.pharmacyService.create(this.pharmacy).subscribe(() => {
      this.router.navigate(['/pharmacies']);
    });
  }
}

