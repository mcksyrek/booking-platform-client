import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { OffersService } from './offers.service';
import { IOffer } from './offer.interface';
import { of } from 'rxjs';

describe('OffersService', () => {
  let service: OffersService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [OffersService, HttpClient],
    });

    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(OffersService);
  });

  describe('#getOffersList', () => {
    it('should make GET request', () => {
      const mockResponse: IOffer[] = [
        { id: 'mockID1', name: 'Mock Name1' },
        { id: 'mockID2', name: 'Mock Name2' },
      ];
      const httpSpy = jest
        .spyOn(httpClient, 'get')
        .mockReturnValue(of(mockResponse));

      service.getOffersList().subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      expect(httpSpy).toHaveBeenCalledTimes(1);
    });
  });
});
