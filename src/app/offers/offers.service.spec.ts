import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { OffersService } from './offers.service';
import { IOffer } from './offer.interface';
import { of } from 'rxjs';
import { OFFER_MOCK } from '@booking/shared/testing/offer-mock-data.constant';

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
      const mockResponse: IOffer[] = [OFFER_MOCK, OFFER_MOCK];
      const httpSpy = jest
        .spyOn(httpClient, 'get')
        .mockReturnValue(of(mockResponse));

      service.getOffersList().subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      expect(httpSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('#postNewOffer', () => {
    it('should make POST request', () => {
      const mockResponse: IOffer = OFFER_MOCK;
      const httpSpy = jest
        .spyOn(httpClient, 'post')
        .mockReturnValue(of(mockResponse));

      service.postNewOffer(OFFER_MOCK).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      expect(httpSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('#deleteOffer', () => {
    it('should make DELETE request', () => {
      const httpSpy = jest.spyOn(httpClient, 'delete');

      service.deleteOffer(1).subscribe(response => {
        expect(response).toEqual(null);
      });

      expect(httpSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('#updateOffer', () => {
    it('should make PUT request', () => {
      const mockResponse: IOffer = OFFER_MOCK;

      const httpSpy = jest
        .spyOn(httpClient, 'put')
        .mockReturnValue(of(mockResponse));

      service.updateOffer(mockResponse).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      expect(httpSpy).toHaveBeenCalledTimes(1);
    });
  });
});
