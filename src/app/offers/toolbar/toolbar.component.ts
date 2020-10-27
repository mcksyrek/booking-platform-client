import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { IOffer } from '../offer.interface';

@Component({
  selector: 'booking-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit {
  // TODO change name offers.offers
  @Select(CombinedState => CombinedState.offers.offers)
  allOffers$: Observable<IOffer[]>;
  cities = new Set<string>();
  categories = new Set<string>();

  ngOnInit(): void {
    this.allOffers$
      .pipe(filter(offers => !!offers))
      .subscribe(offers =>
        offers.map(offer => this._createFilterCategories(offer))
      );
  }

  private _createFilterCategories(offer: IOffer): void {
    this.cities.add(offer.city);
    this.categories.add(offer.category);
  }
}
