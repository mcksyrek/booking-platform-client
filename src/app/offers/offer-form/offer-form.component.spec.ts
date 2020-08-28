import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { OfferFormComponent } from './offer-form.component';

describe('OfferFormComponent', () => {
  let component: OfferFormComponent;
  let fixture: ComponentFixture<OfferFormComponent>;
  let formBuilder: FormBuilder;

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

  describe('submitForm', () => {
    it('should emit formValue', () => {
      const mockOffer = { offerName: 'testName' };
      spyOn(component.submitForm, 'emit');
      component.offerForm.controls.offerName.setValue(mockOffer.offerName);

      component.onSubmit();
      expect(component.submitForm.emit).toHaveBeenCalledWith(mockOffer);
    });
  });

  describe('offerForm', () => {
    it('should be initialised empty with validators ', () => {
      expect(formBuilder.group).toHaveBeenCalledWith({
        offerName: ['', Validators.required],
      });
    });
  });

  describe('disabledSubmit', () => {
    it('should be true if no form value', () => {
      expect(component.disabledSubmit).toBeTruthy();
    });

    it('should be false if form value is correct ', () => {
      component.offerForm.setValue({ offerName: 'testName' });
      expect(component.disabledSubmit).toBeFalsy();
    });
  });
});
