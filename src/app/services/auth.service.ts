import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUserSubject: BehaviorSubject<User>;
  public authUser: Observable<User>;

  constructor(private router: Router) {
    this.authUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('authUser') || '{}')
    );
    this.authUser = this.authUserSubject.asObservable();
  }

  public get authUserValue(): User {
    return this.authUserSubject.value;
  }

  login(user: User) {
    localStorage.setItem('authUser', JSON.stringify(user));
    this.authUserSubject.next(user);
  }

  logout() {
    localStorage.removeItem('authUser');
    this.authUserSubject.next({ email: '', password: '', userRole: '' });
    this.router.navigate(['/login']);
  }
}
