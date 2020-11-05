import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { IProduct } from '../offer.interface';
import { DURATION_HOURS } from '@booking/shared/constants';

@Component({
  selector: 'booking-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
  @Input() readonly parentForm: FormGroup;
  // productsList passed down to component to trigger changeDetection
  @Input() readonly productsList: IProduct[];

  @Output() readonly removeProduct = new EventEmitter<number>();
  @Output() readonly addProduct = new EventEmitter<null>();
  @Output() readonly selectProduct = new EventEmitter<IProduct>();

  productsArray: FormArray;
  readonly hours = DURATION_HOURS;

  ngOnInit(): void {
    this.productsArray = this.parentForm?.controls.products as FormArray;
  }

  addNewProduct(): void {
    this.addProduct.emit();
  }

  deleteProduct(index: number): void {
    this.removeProduct.emit(index);
  }

  handleSelectedProduct(product: IProduct): void {
    this.selectProduct.emit(product);
  }
}
