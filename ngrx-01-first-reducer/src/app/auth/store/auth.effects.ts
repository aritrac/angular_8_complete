import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment'

import * as AuthActions from './auth.actions';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
  }

  @Injectable()
export class AuthEffects {
    @Effect()
    //We should not return an error from the http call to the main actions observable, as the observable will die
    //and not respond to any AuthActions in future, hence we need to return an error free observable from the internal observable
    //which is being returned from within the switchMap, for that we are using the of() operator to create a new
    //error free observable
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http
            .post<AuthResponseData>(
                'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseAPIKey,
                {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
                }
            ).pipe(map(resData => {
                const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                return of( new AuthActions.Login({
                    email: resData.email,
                    userId: resData.localId,
                    token: resData.idToken,
                    expirationDate: expirationDate
                }));
            }),catchError(error => {
                return of();//Creates new observable
            }));
        }),

    );

    constructor( private actions$ : Actions, private http: HttpClient) {}
}