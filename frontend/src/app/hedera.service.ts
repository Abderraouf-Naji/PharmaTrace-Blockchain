import { Injectable } from '@angular/core';
import { Client, TransactionId, TransactionReceiptQuery, AccountId } from '@hashgraph/sdk';

@Injectable({
  providedIn: 'root'
})
export class HederaService {

  private client: Client;
  errorMessage: string = '';  

  constructor() {
    this.client = Client.forTestnet();
    this.client.setOperator(
      AccountId.fromString('0.0.5065801'), 
      '3030020100300706052b8104000a04220420d8c7836bdeaaa2f5d89e424b3a0a229685ce1669bcf6fdaf4ee875164d8b6512'
    );
  }

  // Fonction pour récupérer le reçu de la transaction
  public async getTransactionReceipt(transactionId: string) {
    const txId = TransactionId.fromString(transactionId);
    const transactionReceipt = await new TransactionReceiptQuery()
      .setTransactionId(txId)
      .execute(this.client);

    return transactionReceipt;
  }

  // Fonction pour récupérer une liste de transactions (simulée)
  public async getTransactions(): Promise<any[]> {
    return [
      {
        transactionId: '0x9e7cdfa2b45bbb89292420918509fdab91d38b1916975082f48bf12fc14976ba',
        status: 'Success',
        gasUsed: '41307',
        blockNumber: 12390176,
      },
    ];
  }
}
