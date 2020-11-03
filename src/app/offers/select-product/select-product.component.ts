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
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

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
  avaliableHours: string[];
  // TODO move it to constants
  readonly staticAvaliableHours = [
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
  ];
  readonly mockServerRes = ['9:00', '10:00', '11:00', '13:00', '15:00'];

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
            return of(this.mockServerRes);
          })
        )
        .subscribe(serverRes => {
          this.avaliableHours = this.staticAvaliableHours.filter(
            hour => !serverRes.includes(hour)
          );
          console.log(this.avaliableHours);
        })
    );
  }

  selectHour(hour: string): void {
    this.selectDateForm.controls.selectedHour.setValue(hour);
  }
}
