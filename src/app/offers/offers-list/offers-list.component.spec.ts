import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ReactiveFormsModule } from '@angular/forms';

import { OffersListComponent } from './offers-list.component';
import { OffersState } from '../state/offers.state';
import { AddOfferAction } from '../state/offers.actions';

describe('OffersListComponent', () => {
  let component: OffersListComponent;
  let fixture: ComponentFixture<OffersListComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OffersListComponent],
      imports: [ReactiveFormsModule, NgxsModule.forRoot([OffersState])],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(' toggleOfferForm should toggle `showOfferForm` ', () => {
    component.toggleOfferForm();
    expect(component.showOfferForm).toBeTruthy();
  });

  it('should access offers from Store', () => {
    const mockOffer = { offerName: '123' };
    store.dispatch(new AddOfferAction(mockOffer));

    const offers = store.selectSnapshot(OffersState.getOffers);
    expect(offers).toEqual([mockOffer]);
  });
});
