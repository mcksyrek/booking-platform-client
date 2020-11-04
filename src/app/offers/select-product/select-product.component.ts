import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IProduct } from '../offer.interface';
import { AbstractSubscriber } from '@booking/shared/classes/abstract-subscriber';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MOCK_SERVER_RES, STATIC_AVALIABLE_HOURS } from './constants';

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
  readonly bookedHours = MOCK_SERVER_RES;

  avaliableHours: string[];

  get disableSubmit(): boolean {
    return !this.selectDateForm.valid;
  }

  constructor(
    formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: { product: IProduct }
  ) {
    super();
    this.product = data.product;
    this.selectDateForm = formBuilder.group({
      selectedDate: ['', Validators.required],
      selectedHour: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._subscriber.add(
      this.selectDateForm.controls.selectedDate.valueChanges
        .pipe(
          switchMap(selectedDate => {
            // TODO HTTPReq here
            return of(this.bookedHours);
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

  selectHour(hour: string): void {
    this.selectDateForm.controls.selectedHour.setValue(hour);
  }

  private _checkHoursDuration(
    duration: number,
    hoursToCheck: number[]
  ): string[] {
    // O(1)
    const hoursToCheckLength = hoursToCheck.length;
    // O(n)
    const hoursToCheckSet = new Set(hoursToCheck);

    // O(n)
    return hoursToCheck.reduce((avaliableHours, hourToCheck, index) => {
      // best case O(1)
      if (hoursToCheckLength - index - duration < 0) {
        return avaliableHours;
      }
      // worst case - depends on duration so O(m)
      for (let i = 0; i < duration; i++) {
        // O(1)
        if (!hoursToCheckSet.has(hourToCheck + i)) {
          return avaliableHours;
        }
      }
      return [...avaliableHours, this._mapNumberToHourString(hourToCheck)];
    }, []);
    // total complexity: 0(1)+0(n)+0(n)*0(1 or m) => so best 0(2n) and worst O(n(1+m))
    // fair enough?
  }

  private _mapNumberToHourString(hour: number): string {
    return `${hour}:00`;
  }
}
