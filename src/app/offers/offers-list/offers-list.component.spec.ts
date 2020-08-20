import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ReactiveFormsModule } from '@angular/forms';

import { OffersListComponent } from './offers-list.component';
import { OffersState } from '../state/offers.state';

@Component({
  selector: 'booking-offer-form',
  template: '<p>Mock Product Editor Component</p>',
})
class MockOfferFormComponent {}

describe('OffersListComponent', () => {
  let component: OffersListComponent;
  let fixture: ComponentFixture<OffersListComponent>;
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OffersListComponent, MockOfferFormComponent],
      imports: [ReactiveFormsModule, NgxsModule.forRoot([OffersState])],
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
});
