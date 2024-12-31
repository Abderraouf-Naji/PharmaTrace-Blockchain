import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DistributorService } from 'src/app/services/distributor.service';

@Component({
  selector: 'app-add-distributors',
  templateUrl: './add-distributors.component.html',
  styleUrls: ['./add-distributors.component.css']
})
export class AddDistributorsComponent {
  distributor = {
    name: '',
    address: '',
    phone: '',
    email: '',
    country: ''
  };
  
  formSubmitted = false;

  constructor(private distributorService: DistributorService, private router: Router) {}

  // Méthode pour soumettre le formulaire
  onSubmit() {
    if (this.distributor.name && this.distributor.address && this.distributor.phone && this.distributor.email && this.distributor.country) {
      // Ajout du distributeur via le service
      this.distributorService.addDistributor(this.distributor).subscribe(response => {
        // Réinitialiser le formulaire après soumission
        this.formSubmitted = true;
        this.distributor = {
          name: '',
          address: '',
          phone: '',
          email: '',
          country: ''
        };

        // Rediriger vers la liste des distributeurs
        setTimeout(() => {
          this.router.navigate(['/distributors']);
        }, 2000); // Redirection après 2 secondes
      }, error => {
        console.error('Erreur lors de l\'ajout du distributeur:', error);
      });
    }
  }
}