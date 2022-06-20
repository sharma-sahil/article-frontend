import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../shared/models/user.model';
import { UserResponse } from '../shared/models/user-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<UserResponse>({} as UserResponse);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user/profile')
        .subscribe(
          data => {
            this.setAuth(data)
          },
          err => this.purgeAuth()
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: UserResponse) {

    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  setToken(token: string) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(token);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as UserResponse);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(credentials: any): Observable<User> {
    const route = '/auth/login';
    return this.apiService.post(route, credentials)
      .pipe(map(
        data => {
          this.setToken(data.token);
          this.populate();
          return data;
        }
      ));
  }

  registerUser(userDetails: any): Observable<User> {
    const route = '/public/user';
    return this.apiService.post(route, userDetails)
      .pipe(map(
        data => {
          // this.setAuth(data.user);
          return data;
        }
      ));
  }

  getCurrentUser(): UserResponse {
    return this.currentUserSubject.value;
  }

}
