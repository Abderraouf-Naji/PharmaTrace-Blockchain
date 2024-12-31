import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManufacturersService {
  private apiUrl = 'http://localhost:3000/manufacturers';

  constructor(private http: HttpClient) {}

  getManufacturers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
