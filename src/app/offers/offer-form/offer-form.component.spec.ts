import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IOffer } from '../offer.interface';

import { OfferFormComponent } from './offer-form.component';
import { OFFER_MOCK } from '@booking/shared/testing/offer-mock-data.constant';

describe('OfferFormComponent', () => {
  let component: OfferFormComponent;
  let fixture: ComponentFixture<OfferFormComponent>;
  let formBuilder: FormBuilder;
  const mockOffer: IOffer = OFFER_MOCK;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OfferFormComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    formBuilder = TestBed.inject(FormBuilder);
    jest.spyOn(formBuilder, 'group');

    fixture = TestBed.createComponent(OfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#submitForm', () => {
    it('should emit formValue', () => {
      const emitFormspy = jest.spyOn(component.submitForm, 'emit');
      component.offerForm.setValue(mockOffer);

      component.onSubmit();
      expect(emitFormspy).toHaveBeenCalledWith(mockOffer);
    });
  });

  describe('#offerForm', () => {
    it('should be initialized with empty controls ', () => {
      expect(formBuilder.group).toHaveBeenCalledWith({
        id: [''],
        name: ['', Validators.required],
        author: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        category: ['', Validators.required],
        description: ['', Validators.required],
      });
    });
  });

  describe('#disabledSubmit', () => {
    it('should be true if no form value', () => {
      expect(component.disabledSubmit).toBeTruthy();
    });

    it('should be false if form value is correct ', () => {
      component.offerForm.setValue(mockOffer);
      expect(component.disabledSubmit).toBeFalsy();
    });
  });
});
