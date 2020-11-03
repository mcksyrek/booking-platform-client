import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule, Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '@booking/shared/';
import { OfferDisplayComponent } from './offer-display.component';
import { ProductsListComponent } from '../products-list/products-list.component';

describe('OfferDisplayComponent', () => {
  let component: OfferDisplayComponent;
  let fixture: ComponentFixture<OfferDisplayComponent>;
  let store: Store;
  let activatedRoute: ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OfferDisplayComponent, ProductsListComponent],
      imports: [SharedModule, NgxsModule.forRoot([]), RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(Store);
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture = TestBed.createComponent(OfferDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#getSource', () => {
    it('should return string', () => {
      expect(
        typeof component.getSource('string value') === 'string'
      ).toBeTruthy();
    });
  });
});
