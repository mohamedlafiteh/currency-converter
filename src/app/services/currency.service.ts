import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Currency, ConversionResult } from '../models/currency.model';


@Injectable({ providedIn: 'root' })
export class CurrencyApiService {
  private readonly baseUrl = environment.currencyApiBase

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.baseUrl}/currencies`, {
      params: { type: 'fiat' }
    });
  }

    convertAmount(from: string, to: string, amount: number): Observable<ConversionResult> {
    return this.http.get<ConversionResult>(`${this.baseUrl}/convert`, {
      params: { from, to, amount: String(amount) }
    });
  }
}
