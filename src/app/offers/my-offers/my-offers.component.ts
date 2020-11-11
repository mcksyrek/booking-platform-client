import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthState } from '@booking/auth/auth.state';
import { AbstractSubscriber } from '@booking/shared/classes/abstract-subscriber';
import { Routes } from '@booking/shared/enums';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IOffer } from '../offer.interface';
import { OffersService } from '../offers.service';

@Component({
  selector: 'booking-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOffersComponent extends AbstractSubscriber implements OnInit {
  @Select(AuthState.getUsername)
  readonly username$: Observable<string>;
  offers: IOffer[];

  constructor(
    private _offerService: OffersService,
    private _changeDetector: ChangeDetectorRef,
    private _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this._subscriber.add(
      this.username$
        .pipe(
          switchMap(username => this._offerService.getOffersByAuthor(username))
        )
        .subscribe(offers => {
          this.offers = offers;
          this._changeDetector.markForCheck();
        })
    );
  }

  viewOffer(id: number): void {
    this._router.navigateByUrl(Routes.Offers + `/${id}`);
  }

  editOffer(id: number): void {
    this._router.navigateByUrl(Routes.Offers + Routes.Edit + `/${id}`);
  }
}
