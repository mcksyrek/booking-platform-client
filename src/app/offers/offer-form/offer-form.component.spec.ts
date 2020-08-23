import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { OfferFormComponent } from './offer-form.component';

describe('OfferFormComponent', () => {
  let component: OfferFormComponent;
  let fixture: ComponentFixture<OfferFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OfferFormComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit formValue onSubmit', () => {
    const mockOffer = { offerName: 'testName' };
    spyOn(component.submitForm, 'emit');
    component.offerForm.controls.offerName.setValue(mockOffer.offerName);

    component.onSubmit();
    expect(component.submitForm.emit).toHaveBeenCalledWith(mockOffer);
  });

  describe('offerForm', () => {
    it('form should be invalid when empty', () => {
      expect(component.offerForm.valid).toBeFalsy();
    });

    it('form should be valid when has content', () => {
      component.offerForm.controls.offerName.setValue('testName');
      expect(component.offerForm.valid).toBeTruthy();
    });
  });
});
