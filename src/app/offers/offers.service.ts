import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOffer } from './offer.interface';
import { Endpoints } from '@booking/shared/enums';
import { environment } from '@booking/environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  constructor(private _http: HttpClient) {}

  getOffersList(): Observable<IOffer[]> {
    return this._http.get<IOffer[]>(
      `${environment.apiPrefix}${Endpoints.Offers}`
    );
  }

  postNewOffer(newOffer: IOffer): Observable<null> {
    return this._http.post<null>(
      `${environment.apiPrefix}${Endpoints.Offers}`,
      newOffer
    );
  }

  deleteOffer(id: number): Observable<ArrayBuffer> {
    return this._http.delete<null>(
      `${environment.apiPrefix}${Endpoints.Offers}`,
      {
        params: {
          id: id.toString(),
        },
      }
    );
  }

  updateOffer(id: number, updatedOffer: IOffer): Observable<null> {
    return this._http.put<null>(
      `${environment.apiPrefix}${Endpoints.Offers}`,
      updatedOffer,
      {
        params: {
          id: id.toString(),
        },
      }
    );
  }
}
