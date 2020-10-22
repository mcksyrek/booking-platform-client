import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'booking-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditOfferComponent implements OnInit, OnDestroy {
  constructor(private _route: ActivatedRoute) {}
  formType: string;
  private _subscriber = new Subscriber();

  ngOnInit(): void {
    this._subscriber.add(
      this._route.url.subscribe(url => (this.formType = url[0].path))
    );
  }

  ngOnDestroy(): void {
    this._subscriber.unsubscribe();
  }
}
