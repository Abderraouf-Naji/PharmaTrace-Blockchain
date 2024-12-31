export interface Manufacturer {
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  hederaAccount?: string; // Ajouté pour Hedera
  hederaRole?: string;    // Ajouté pour Hedera
}
