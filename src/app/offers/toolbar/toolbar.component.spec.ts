import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule, Store } from '@ngxs/store';
import { SharedModule } from '@booking/shared';

import { ToolbarComponent } from './toolbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let formBuilder: FormBuilder;
  let store: Store;
  let formGroupSpy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [
        ReactiveFormsModule,
        NgxsModule.forRoot([]),
        SharedModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    formBuilder = TestBed.inject(FormBuilder);
    formGroupSpy = jest.spyOn(formBuilder, 'group');

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toolbarForm', () => {
    it('should be initialized', () => {
      expect(formGroupSpy).toHaveBeenCalledTimes(2);
      expect(component.toolbarForm).toBeTruthy();
    });

    it('should includes sort object', () => {
      expect(
        Object.keys(component.toolbarForm.value).includes('sort')
      ).toBeTruthy();
      expect(typeof component.toolbarForm.value.sort).toEqual('string');
    });

    it('should includes sort filters', () => {
      expect(
        Object.keys(component.toolbarForm.value).includes('filters')
      ).toBeTruthy();

      expect(
        Object.keys(component.toolbarForm.value.filters).length
      ).toBeGreaterThan(1);
    });
  });
});
