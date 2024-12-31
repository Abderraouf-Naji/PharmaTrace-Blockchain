import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MetamaskService } from '../metamask.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
	imports: [NgbCarouselModule,CommonModule]
})
export class HomeComponent implements OnInit {
  public userAddress: string | null = null;
  router: any;

  constructor(private metamaskService: MetamaskService,router:Router) {}

  ngOnInit(): void {
    this.checkConnection();
  }

  // Vérifier si l'utilisateur est déjà connecté à MetaMask
  async checkConnection() {
    const isConnected = await this.metamaskService.checkIfConnected();
    if (isConnected) {
      this.userAddress = this.metamaskService.getUserAddress();
    }
  }

  // Connexion via MetaMask
  async connectToMetaMask() {
    await this.metamaskService.connect();
    this.userAddress = this.metamaskService.getUserAddress();
  }

  // Fonction pour envoyer des fonds via MetaMask
  async sendTransaction() {
    const tx = await this.metamaskService.sendTransaction('0xAddressHere', '0.1');
    console.log("Transaction envoyée:", tx);
  }
  goToEmployeeList(){
    this.router.navigate(['/show-all-employees']);
  }
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/2000/600`);

}
