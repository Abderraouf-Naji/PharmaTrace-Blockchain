import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-manufacturers',
  templateUrl: './add-manufacturers.component.html',
  styleUrls: ['./add-manufacturers.component.css']
})
export class AddManufacturersComponent {
  manufacturer = {
    name: '',
    address: '',
    phone: '',
    email: '',
    country: ''
  };

  constructor(private router: Router) {}

  onSubmit(): void {
    // Logique pour ajouter le fabricant
    console.log('Nouveau fabricant ajouté:', this.manufacturer);

    // Simuler un ajout réussi
    // Vous pouvez ici appeler un service pour ajouter le fabricant via une API
    // Après l'ajout, rediriger vers la liste des fabricants ou afficher un message de confirmation
    this.router.navigate(['/manufacturers/list']);
  }
}