import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IOffer } from '../offer.interface';

import { OfferFormComponent } from './offer-form.component';

describe('OfferFormComponent', () => {
  let component: OfferFormComponent;
  let fixture: ComponentFixture<OfferFormComponent>;
  let formBuilder: FormBuilder;
  const mockOffer: IOffer = { name: 'Mock Name', id: 1 };

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
        name: ['', Validators.required],
        id: [''],
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
