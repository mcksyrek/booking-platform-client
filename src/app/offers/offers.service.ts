import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOffer } from './offer.interface';
import { Endpoints } from '@booking/shared/enums';
import { environment } from '@booking/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  constructor(private _http: HttpClient) {}

  getOffersList(): Observable<IOffer[]> {
    return this._http.get<IOffer[]>(
      `${environment.serverUrl}${Endpoints.Offers}`
    );
  }
}
