import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Routes } from '@booking/shared/enums';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthState } from '../auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  @Select(AuthState.isLogged)
  isLogged$: Observable<boolean>;

  constructor(public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isLogged$.pipe(
      map(isLogged =>
        isLogged ? true : this.router.createUrlTree([Routes.Offers])
      )
    );
  }
}
