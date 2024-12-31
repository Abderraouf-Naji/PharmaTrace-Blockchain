import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlockchainService {
  private mirrorNodeUrl = environment.mirrorNodeUrl;

  constructor(private http: HttpClient) {}

  // Récupérer les transactions d'un compte
  getAccountTransactions(accountId: string): Observable<any> {
    const url = `${this.mirrorNodeUrl}/accounts/${accountId}/transactions`;
    return this.http.get<any>(url);
  }



  // Récupérer les détails d'un contrat
getContractDetails(contractId: string): Observable<any> {
  const url = `${this.mirrorNodeUrl}/contracts/${contractId}`;
  return this.http.get<any>(url);
}

// Exécuter une fonction d'un contrat
executeContractFunction(contractId: string, functionParameters: any): Observable<any> {
  const url = `${this.mirrorNodeUrl}/contracts/${contractId}/call`;
  return this.http.post<any>(url, functionParameters);
}

}
