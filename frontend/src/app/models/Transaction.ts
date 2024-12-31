export interface Transaction {
  id: number; 
  product: string;
  quantity: number;
  unitPrice: number;
  manufacturer: string;
  distributor: string;
  pharmacy: string;
  date: string; 
  transactionType: string;
}
