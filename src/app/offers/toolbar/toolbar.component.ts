import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AbstractSubscriber } from '@booking/shared/classes/abstract-subscriber';
import { SortingTypesEnum } from '@booking/shared/enums';
import { sortOffers } from '@booking/shared/utils/';
import { OffersState } from '../state/offers.state';
import { IOffer } from '../offer.interface';

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
  allOffersList: IOffer[];
  cities = new Set<string>();
  categories = new Set<string>();

  constructor(formBuilder: FormBuilder) {
    super();
    this.toolbarForm = formBuilder.group({
      sort: [this.sortingTypes[0]],
    });
  }

  ngOnInit(): void {
    this.addSubscriptions([
      this.allOffers$.pipe(filter(offers => !!offers)).subscribe(offers => {
        this.allOffersList = sortOffers(this.toolbarForm.value.sort, offers);
        offers.map(offer => this._createFilterCategories(offer));
      }),
      this.toolbarForm.controls.sort.valueChanges.subscribe(sortType =>
        this.setOffersList.emit(sortOffers(sortType, this.allOffersList))
      ),
    ]);
  }

  private _createFilterCategories(offer: IOffer): void {
    this.cities.add(offer.city);
    this.categories.add(offer.category);
  }
}
