import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOffer } from './offer.interface';
import { Endpoints } from '@booking/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  constructor(private _http: HttpClient) {}

  // TODO service and repo service separately
  getOffersList(): Observable<IOffer[]> {
    return this._http.get<IOffer[]>(Endpoints.Offers);
  }
}
