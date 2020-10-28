import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { IProduct } from '../offer.interface';

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
  productsArray: FormArray;

  ngOnInit(): void {
    this.productsArray = this.parentForm.controls.products as FormArray;
  }

  deleteProduct(index: number): void {
    this.productsArray.removeAt(index);
  }
}
