import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Type,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthState } from '@booking/auth/auth.state';
import { AbstractSubscriber } from '@booking/shared/classes/abstract-subscriber';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IReservation } from '../offer.interface';
import { OffersService } from '../offers.service';

@Component({
  selector: 'booking-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationsListComponent extends AbstractSubscriber
  implements OnInit {
  @Select(AuthState.getUsername)
  readonly username$: Observable<string>;
  reservations: any[];
  readonly type: string;

  constructor(
    activatedRoute: ActivatedRoute,
    private _offersService: OffersService,
    private _changeDetector: ChangeDetectorRef
  ) {
    super();
    this.type = activatedRoute.snapshot.params.type;
  }

  ngOnInit(): void {
    this._subscriber.add(
      this.username$
        .pipe(
          switchMap(username =>
            this._offersService.getUserReservations(username, this.type)
          )
        )
        .subscribe(reservations => {
          this.reservations = this._handleReservations(reservations);
          this._changeDetector.markForCheck();
        })
    );
  }

  private _handleReservations(reservationsList: any[]): any[] {
    return reservationsList
      .map(reservation => {
        const splitDate = reservation.date
          .split('/')
          .map(dateElement => parseInt(dateElement, 10));

        splitDate[1] = splitDate[1] - 1;
        const date = new Date(
          splitDate[2],
          splitDate[1],
          splitDate[0],
          reservation.hour
        );
        return { ...reservation, date, provider: reservation.providerUsername };
      })
      .sort((a, b) => {
        return a.date.getTime() - b.date.getTime();
      });
  }
}
