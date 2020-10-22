import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private menuSubject = new Subject();
  readonly menuAction$ = this.menuSubject.asObservable();

  toggleMenu(): void {
    this.menuSubject.next(null);
  }
}
