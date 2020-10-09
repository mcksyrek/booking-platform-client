import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { OffersService } from './offers.service';
import { IOffer } from './offer.interface';
import { Endpoints } from '@booking/shared/enums';

describe('OffersService', () => {
  let service: OffersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OffersService],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(OffersService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getOffersList', () => {
    it('should return an Observable<IOffer[]>', () => {
      const mockResponse: IOffer[] = [
        { name: 'mockName1', id: 'mockID1' },
        { name: 'mockName2', id: 'mockID2' },
      ];

      service.getOffersList().subscribe(offers => {
        expect(offers.length).toBe(2);
        expect(offers).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(Endpoints.Offers);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
