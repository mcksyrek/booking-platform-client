import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AbstractSubscriber } from '@booking/shared/classes/abstract-subscriber';
import { SortingTypesEnum } from '@booking/shared/enums';
import { sortOffers } from '@booking/shared/utils/';
import { OffersState } from '../state/offers.state';
import { IOffer } from '../offer.interface';
import { filterOffersByAttribute } from '@booking/shared/utils';

@Component({
  selector: 'booking-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent extends AbstractSubscriber implements OnInit {
  // TODO change architecture to use Store
  @Output() setOffersList = new EventEmitter<IOffer[]>();
  @Select(OffersState.getOffers)
  readonly allOffers$: Observable<IOffer[]>;
  readonly sortingTypes = Object.values(SortingTypesEnum);

  readonly toolbarForm: FormGroup;
  readonly filtersGroup: FormGroup;

  allOffersList: IOffer[];
  allCategoriesList: string[];
  allCitiesList: string[];

  constructor(private _formBuilder: FormBuilder) {
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
    this.addSubscriptions([
      this.allOffers$.pipe(filter(offers => !!offers)).subscribe(offers => {
        this.allOffersList = sortOffers(this.toolbarForm.value.sort, offers);
        this._setUniqueFilters(offers);
      }),

      this.toolbarForm.controls.sort.valueChanges.subscribe(sortType =>
        this.setOffersList.emit(sortOffers(sortType, this._combinedFilters()))
      ),

      this.filtersGroup.valueChanges.subscribe(() =>
        this.setOffersList.emit(this._combinedFilters())
      ),
    ]);
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
        return filterOffersByAttribute(
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
}
