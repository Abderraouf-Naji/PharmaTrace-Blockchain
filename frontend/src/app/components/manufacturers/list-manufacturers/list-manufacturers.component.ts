import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-manufacturers',
  templateUrl: './list-manufacturers.component.html',
  styleUrls: ['./list-manufacturers.component.css'],
})
export class ListManufacturersComponent implements OnInit {
  fabricants: any[] = [];
  loading = false; // Désactivez le chargement car il s'agit d'une liste statique.
  error: string | null = null;

  ngOnInit(): void {
    this.fetchFabricants();
  }

  // Récupérer la liste statique des fabricants
  fetchFabricants(): void {
    try {
      // Liste statique des fabricants
      this.fabricants = [
        {
          name: 'FabriTech',
          email: 'contact@fabritech.com',
          phone: '123-456-7890',
          address: '123 Rue de la Technologie',
          country: 'France',
          hederaAccount: '0x0cf9d98845279aFa10462D585E85427b5Ec423b0',
        },
        {
          name: 'MediCure Labs',
          email: 'info@medicurelabs.com',
          phone: '987-654-3210',
          address: '456 Rue de la Santé',
          country: 'France',
          hederaAccount: '0x00000000000000000000000000000000004EF193',
        },
        {
          name: 'BioPharm Co.',
          email: 'contact@biopharm.com',
          phone: '555-123-4567',
          address: '789 Rue des Sciences',
          country: 'France',
          hederaAccount: '0x1F4A92E9D432A5cD8c61E10C036012139d1E7983',
        },
      ];
    } catch (err) {
      this.error = 'Erreur lors du chargement des fabricants.';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }
}
