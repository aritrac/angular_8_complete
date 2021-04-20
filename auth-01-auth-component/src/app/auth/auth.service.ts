import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient){}
    signup(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCP-nrx1gXAEVGtK3kcl2QxpaXDAHkRnMc',{
            email:email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(errorRes => {
            let errorMesage = "An unknown error occurred!";
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMesage);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                  errorMesage = 'This email exists already';
              }
              return throwError(errorMesage);
        }));
    }
}