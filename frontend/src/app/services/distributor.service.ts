import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {
  private apiUrl = 'https://api.example.com/distributors';

  constructor(private http: HttpClient) {}

  addDistributor(distributor: any): Observable<any> {
    return this.http.post(this.apiUrl, distributor);
  }
}
