import { Store } from '@ngxs/store';
import { AuthService } from './auth.service';
import { SetTokenAction } from './auth.actions';
import { tap } from 'rxjs/operators';

export function authInitializer(
  authService: AuthService,
  store: Store
): () => void {
  return () => {
    const token = authService.getTokenFromLocalStorage();
    return store
      .dispatch(new SetTokenAction(token))
      .pipe(tap(res => console.log(res)))
      .toPromise();
  };
}
