import { Component, OnInit } from '@angular/core';
import { HederaService } from '../../../hedera.service'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  transactions: any[] = [];
  selectedTransaction: any;
  errorMessage: string = ''; 

  constructor(private hederaService: HederaService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  public async loadTransactions() {
    try {
      this.transactions = await this.hederaService.getTransactions();
    } catch (error: any) {
      this.errorMessage = 'Erreur lors de la récupération des transactions: ' + error.message;
    }
  }
  
  public async showTransactionDetails(transactionId: string) {
    try {
      this.selectedTransaction = await this.hederaService.getTransactionReceipt(transactionId);
    } catch (error: any) {
      this.errorMessage = 'Erreur lors de la récupération des détails de la transaction: ' + error.message;
    }
  }
  
}
