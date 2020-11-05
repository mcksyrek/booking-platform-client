import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IProduct, IReservation } from '../offer.interface';
import { AbstractSubscriber } from '@booking/shared/classes/abstract-subscriber';
import { map, switchMap, tap } from 'rxjs/operators';
import { STATIC_AVALIABLE_HOURS } from './constants';
import { OffersService } from '../offers.service';
import { dateFormatter } from '@booking/shared/utils';

@Component({
  selector: 'booking-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectProductComponent extends AbstractSubscriber
  implements OnInit {
  readonly product: IProduct;
  readonly selectDateForm: FormGroup;
  readonly staticAvaliableHours = STATIC_AVALIABLE_HOURS;
  readonly offerId: string;
  readonly currentDate = new Date();
  readonly duration: number;
  readonly productName: string;

  avaliableHours: string[];

  get disableSubmit(): boolean {
    return !this.selectDateForm.valid;
  }

  constructor(
    formBuilder: FormBuilder,
    private _offersService: OffersService,
    @Inject(MAT_DIALOG_DATA) data: { product: IProduct; offerId: number }
  ) {
    super();
    this.product = data.product;
    this.offerId = data.offerId.toString();
    this.duration = data.product.duration;
    this.productName = data.product.name;
    this.selectDateForm = formBuilder.group({
      selectedDate: ['', Validators.required],
      selectedHour: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._subscriber.add(
      this.selectDateForm.controls.selectedDate.valueChanges
        .pipe(
          map(dateObject => dateFormatter(dateObject)),
          switchMap(formattedDate => {
            return this._offersService.getReservedTerms(
              formattedDate,
              this.offerId
            );
          }),
          map(bookedHours => new Set(bookedHours))
        )
        .subscribe(bookedHoursSet => {
          const filteredHours = this.staticAvaliableHours.filter(
            hour => !bookedHoursSet.has(hour)
          );
          this.avaliableHours = this._checkHoursDuration(
            this.product.duration,
            filteredHours
          );
        })
    );
  }

  createReservation(): IReservation {
    const { selectedDate, selectedHour } = this.selectDateForm.value;
    if (!selectedDate) {
      return null;
    }
    return {
      product: this.productName,
      hour: this._mapHourStringToNumber(selectedHour),
      duration: this.duration,
      date: dateFormatter(selectedDate),
    };
  }

  private _checkHoursDuration(
    duration: number,
    hoursToCheck: number[]
  ): string[] {
    const hoursToCheckLength = hoursToCheck.length;
    const hoursToCheckSet = new Set(hoursToCheck);
    return hoursToCheck.reduce((avaliableHours, hourToCheck, index) => {
      if (hoursToCheckLength - index - duration < 0) {
        return avaliableHours;
      }
      for (let i = 0; i < duration; i++) {
        if (!hoursToCheckSet.has(hourToCheck + i)) {
          return avaliableHours;
        }
      }
      return [...avaliableHours, this._mapNumberToHourString(hourToCheck)];
    }, []);
  }

  private _mapNumberToHourString(hour: number): string {
    return `${hour}:00`;
  }

  private _mapHourStringToNumber(hourString: string): number {
    return parseInt(hourString.split(':')[0], 10);
  }
}
