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

  getOfferById(id: number): Observable<IOffer> {
    return this._http.get<IOffer>(
      `${environment.apiPrefix}${Endpoints.Offers}/${id}`
    );
  }

  postNewOffer(newOffer: IOffer): Observable<IOffer> {
    return this._http.post<IOffer>(
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

  updateOffer(updatedOffer: IOffer): Observable<IOffer> {
    return this._http.put<IOffer>(
      `${environment.apiPrefix}${Endpoints.Offers}`,
      updatedOffer
    );
  }
}
