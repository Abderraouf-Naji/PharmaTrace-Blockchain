import { Component } from '@angular/core';
import { Transaction } from 'src/app/models/Transaction';
import { TransactionService } from 'src/app/services/transaction.service';


@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent {
  transaction: Transaction = {
    id: 0,
    product: '',
    quantity: 0,
    unitPrice: 0,
    manufacturer: '',
    distributor: '',
    pharmacy: '',
    date: '',
    transactionType: 'Achat'
  };

  constructor(private transactionService: TransactionService) {}

  onSubmit(): void {
    this.transactionService.addTransaction(this.transaction).subscribe({
      next: (newTransaction) => {
        console.log("Transaction added:", newTransaction);
      },
      error: (error) => console.error("Error adding transaction:", error)
    });
  }
}
