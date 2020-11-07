import { Store } from '@ngxs/store';
import { AuthService } from './auth.service';
import { SetSessionDataAction } from './auth.actions';

export function authInitializer(
  authService: AuthService,
  store: Store
): () => void {
  return () => {
    const token = authService.getTokenFromLocalStorage();
    const username = authService.getUsernameFromLocalStorage();
    return store
      .dispatch(new SetSessionDataAction(token, username))
      .toPromise();
  };
}
