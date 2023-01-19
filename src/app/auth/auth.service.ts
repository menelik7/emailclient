import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

interface UsernameAvailableResponse {
  avilable: true;
}

export interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SingupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      `${this.rootUrl}/auth/username`,
      {
        username,
      }
    );
  }

  signup(credentials: SignupCredentials) {
    return this.http
      .post<SingupResponse>(`${this.rootUrl}/auth/signup`, credentials)
      .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }
}
