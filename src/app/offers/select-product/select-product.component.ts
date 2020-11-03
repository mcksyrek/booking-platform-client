import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProduct } from '../offer.interface';

@Component({
  selector: 'booking-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectProductComponent implements OnInit {
  readonly product: IProduct;

  constructor(@Inject(MAT_DIALOG_DATA) data: { product: IProduct }) {
    this.product = data.product;
  }

  ngOnInit(): void {}
}
