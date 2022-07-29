import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ShelfApiService } from '@draftio/shared-data-access-api';
import { CreateUserModel } from '@draftio/shared/common';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly angularFireAuth: AngularFireAuth, private readonly shelfApiService: ShelfApiService) {}

  private readonly isLoading = new BehaviorSubject<boolean>(true);

  public readonly isLoading$ = this.isLoading.asObservable();

  public readonly user$ = this.angularFireAuth.user.pipe(tap(() => this.isLoading.next(false)));

  public createUser(model: Partial<CreateUserModel>): Observable<void> {
    return this.user$.pipe(
      first(),
      map((user) => {
        user?.getIdToken().then(console.log);

        return { ...model, uid: user?.uid } as CreateUserModel;
      }),
      switchMap((model) => this.shelfApiService.createUser(model))
    );
  }

  public async googleLogin() {
    return this.loginByProvider(new firebase.auth.GoogleAuthProvider());
  }

  public async githubLogin() {
    return this.loginByProvider(new firebase.auth.GithubAuthProvider());
  }

  public logout() {
    this.angularFireAuth.signOut();
  }

  private loginByProvider(provider: firebase.auth.AuthProvider) {
    this.angularFireAuth.signInWithPopup(provider);
  }
}
