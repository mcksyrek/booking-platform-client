import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AbstractSubscriber } from '@booking/shared/classes/abstract-subscriber';
import { SortingTypes } from '@booking/shared/enums';
import { OffersState } from '../state/offers.state';
import { IOffer } from '../offer.interface';
import { SetCustomizedOffersAction } from '../state/offers.actions';
import { OffersService } from '../offers.service';

@Component({
  selector: 'booking-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent extends AbstractSubscriber implements OnInit {
  @Select(OffersState.getOffers)
  readonly allOffers$: Observable<IOffer[]>;
  allOffersList: IOffer[];

  readonly sortingTypes = Object.values(SortingTypes);

  readonly toolbarForm: FormGroup;
  readonly filtersGroup: FormGroup;

  allCategoriesList: string[];
  allCitiesList: string[];

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store,
    private _offersService: OffersService
  ) {
    super();
    this.toolbarForm = _formBuilder.group({
      sort: [this.sortingTypes[0]],
      filters: this._formBuilder.group({
        category: [],
        city: [],
      }),
    });

    this.filtersGroup = this.toolbarForm.controls.filters as FormGroup;
  }

  ngOnInit(): void {
    this.addSubscriptions(
      this.allOffers$.pipe(filter(offers => !!offers)).subscribe(offers => {
        this.allOffersList = offers;

        this._setUniqueFilters(offers);
        this._setCustomizedOffers(
          this._offersService.sortOffers(
            this.toolbarForm.value.sort,
            this._combinedFilters()
          )
        );
      }),

      this.toolbarForm.controls.sort.valueChanges.subscribe(sortType =>
        this._setCustomizedOffers(
          this._offersService.sortOffers(sortType, this._combinedFilters())
        )
      ),

      this.filtersGroup.valueChanges.subscribe(() =>
        this._setCustomizedOffers(this._combinedFilters())
      )
    );
  }

  private _createArrOfUniqueValues(
    offersArray: IOffer[],
    attribute: string
  ): string[] {
    const valuesSet = offersArray.reduce((valuesAcc, currOffer) => {
      return valuesAcc.add(currOffer[attribute]);
    }, new Set<string>());

    return Array.from(valuesSet);
  }

  private _combinedFilters(): IOffer[] {
    return Object.keys(this.filtersGroup.value).reduce(
      (filteredOffers, filterType) => {
        return this._offersService.filterObjectsListByAttributeValue(
          filterType,
          this.filtersGroup.value[filterType],
          filteredOffers
        );
      },
      this.allOffersList
    );
  }

  private _setUniqueFilters(offers: IOffer[]): void {
    this.allCategoriesList = this._createArrOfUniqueValues(offers, 'category');
    this.filtersGroup.controls.category.patchValue(this.allCategoriesList);

    this.allCitiesList = this._createArrOfUniqueValues(offers, 'city');
    this.filtersGroup.controls.city.patchValue(this.allCitiesList);
  }

  private _setCustomizedOffers(newCustomOffersList: IOffer[]): void {
    this._store.dispatch(new SetCustomizedOffersAction(newCustomOffersList));
  }
}
