import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class MetamaskService {
  private provider: any;
  private signer: any;
  public userAddress: string | null = null;

  constructor() {
    // Vérifier si MetaMask est installé
    if (typeof window.ethereum !== 'undefined') {
      console.log("MetaMask est installé !");
      this.provider = new ethers.BrowserProvider(window.ethereum);
    } else {
      console.error("MetaMask n'est pas installé.");
    }
  }

  // Fonction pour se connecter à MetaMask
  async connect(): Promise<void> {
    if (!this.provider) {
      throw new Error("MetaMask n'est pas installé");
    }

    try {
      // Demander l'accès au compte MetaMask
      const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
      this.userAddress = accounts[0]; // L'adresse du compte MetaMask
      this.signer = this.provider.getSigner();
      console.log("Adresse de l'utilisateur:", this.userAddress);
    } catch (error) {
      console.error("Erreur de connexion à MetaMask:", error);
    }
  }

  // Fonction pour vérifier si l'utilisateur est déjà connecté
  async checkIfConnected(): Promise<boolean> {
    if (this.userAddress) {
      return true;
    }

    // Si MetaMask est déjà installé, on vérifie si l'utilisateur a un compte connecté
    try {
      const accounts = await this.provider.listAccounts();
      if (accounts.length > 0) {
        this.userAddress = accounts[0];
        return true;
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de la connexion à MetaMask:", error);
    }
    return false;
  }

  // Fonction pour obtenir l'adresse de l'utilisateur
  getUserAddress(): string | null {
    return this.userAddress;
  }

  // Fonction pour envoyer une transaction
  async sendTransaction(toAddress: string, amount: string): Promise<any> {
    try {
      if (!this.signer) throw new Error("Signer non disponible");

      const tx = await this.signer.sendTransaction({
        to: toAddress,
        value: ethers.parseEther(amount) // Convertir la valeur en ethers
      });
      console.log("Transaction envoyée:", tx);
      return tx;
    } catch (error) {
      console.error("Erreur lors de l'envoi de la transaction:", error);
    }
  }
}
