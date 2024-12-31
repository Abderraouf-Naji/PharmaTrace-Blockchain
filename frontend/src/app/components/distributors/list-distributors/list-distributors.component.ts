import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-distributors',
  templateUrl: './list-distributors.component.html',
  styleUrls: ['./list-distributors.component.css']
})
export class ListDistributorsComponent implements OnInit {
  // Liste des distributeurs
  distributors = [
    { id: 1, name: 'Distrib Pharma', address: '123 Pharma Street', phone: '+33 1 23 45 67 89', email: 'contact@distribpharma.com', country: 'France' },
    { id: 2, name: 'Medi Distribution', address: '456 Health Ave', phone: '+33 1 23 45 67 90', email: 'info@medidistribution.com', country: 'France' },
    { id: 3, name: 'Global Med Distributors', address: '789 Wellness Road', phone: '+33 1 23 45 67 91', email: 'support@globalmed.com', country: 'USA' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Vous pouvez récupérer les distributeurs via un service API ici
    // Exemple: this.distributorsService.getDistributors().subscribe(data => this.distributors = data);
  }

  // Méthode pour afficher les détails d'un distributeur
  viewDetails(distributorId: number): void {
    this.router.navigate([`/distributors/details/${distributorId}`]);
  }

  // Méthode pour modifier un distributeur
  editDistributor(distributorId: number): void {
    this.router.navigate([`/distributors/edit/${distributorId}`]);
  }

  // Méthode pour supprimer un distributeur
  deleteDistributor(distributorId: number): void {
    // Logique pour supprimer un distributeur via un service backend
    console.log(`Distributeur ${distributorId} supprimé`);

    // Simulation de suppression : on enlève le distributeur de la liste
    this.distributors = this.distributors.filter(d => d.id !== distributorId);
  }
}
