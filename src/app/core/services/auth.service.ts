import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { LOGIN_QUERY, SIGNUP_MUTATION } from '../../graphql/auth.graphql';
import { AuthPayload, LoginInput, SignupInput, User } from '../models/auth.models';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apollo = inject(Apollo);
  private readonly sessionService = inject(SessionService);

  login(input: LoginInput): Observable<AuthPayload> {
    return this.apollo.watchQuery<{ login: AuthPayload }>({
      query: LOGIN_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache',
    }).valueChanges.pipe(
      map(result => result.data.login),
      map(payload => {
        this.sessionService.setSession(payload.token, payload.user);
        return payload;
      })
    );
  }

  signup(input: SignupInput): Observable<User> {
    return this.apollo.mutate<{ signup: User }>({
      mutation: SIGNUP_MUTATION,
      variables: { input },
    }).pipe(map(result => result.data!.signup));
  }

  logout(): void {
    this.sessionService.clearSession();
    this.apollo.client.clearStore();
  }
}