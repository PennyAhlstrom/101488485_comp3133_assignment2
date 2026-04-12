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
    return this.apollo.query<{ login: AuthPayload }>({
      query: LOGIN_QUERY,
      variables: { input },
      fetchPolicy: 'no-cache',
    }).pipe(
      map(result => {
        if (!result.data?.login) {
          throw new Error('Login failed.');
        }

        const payload = result.data.login as AuthPayload;
        this.sessionService.setSession(payload.token, payload.user);
        return payload;
      })
    );
  }

  signup(input: SignupInput): Observable<User> {
    return this.apollo.mutate<{ signup: User }>({
      mutation: SIGNUP_MUTATION,
      variables: { input },
    }).pipe(
      map(result => {
        if (!result.data?.signup) {
          throw new Error('Signup failed.');
        }
        return result.data.signup as User;
      })
    );
  }

  logout(): void {
    this.sessionService.clearSession();
    this.apollo.client.clearStore();
  }
}