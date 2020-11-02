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
  @Output() setOffersList = new EventEmitter<IOffer[]>();
  @Select(OffersState.getOffers)
  readonly allOffers$: Observable<IOffer[]>;
  readonly sortingTypes = Object.values(SortingTypesEnum);
  readonly toolbarForm: FormGroup;
  readonly filtersGroup: FormGroup;
  readonly categoriesFilter: FormControl;
  allOffersList: IOffer[];
  allCategoriesList: string[];

  constructor(private _formBuilder: FormBuilder) {
    super();
    this.toolbarForm = _formBuilder.group({
      sort: [this.sortingTypes[0]],
      filters: this._formBuilder.group({
        categories: [],
      }),
    });

    this.filtersGroup = this.toolbarForm.controls.filters as FormGroup;
    this.categoriesFilter = this.filtersGroup.controls
      .categories as FormControl;
  }

  ngOnInit(): void {
    this.addSubscriptions([
      this.allOffers$.pipe(filter(offers => !!offers)).subscribe(offers => {
        this.allOffersList = sortOffers(this.toolbarForm.value.sort, offers);
        this.allCategoriesList = this._createArrOfUniqueValues(
          offers,
          'category'
        );
        this.categoriesFilter.patchValue(this.allCategoriesList);
      }),

      this.toolbarForm.controls.sort.valueChanges.subscribe(sortType =>
        this.setOffersList.emit(sortOffers(sortType, this.allOffersList))
      ),

      this.categoriesFilter.valueChanges.subscribe(selectedCategories =>
        this.setOffersList.emit(
          filterOffersByAttribute(
            'category',
            selectedCategories,
            this.allOffersList
          )
        )
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
}
