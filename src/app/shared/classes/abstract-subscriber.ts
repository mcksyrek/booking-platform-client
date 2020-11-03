import { OnDestroy } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';

export abstract class AbstractSubscriber implements OnDestroy {
  protected _subscriber = new Subscriber();

  ngOnDestroy(): void {
    this._subscriber.unsubscribe();
  }

  protected addSubscriptions(...subscriptions: Subscription[]): void {
    subscriptions.forEach(subscription => this._subscriber.add(subscription));
  }
}
