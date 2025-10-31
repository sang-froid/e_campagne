import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscriber, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  login(item: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/login', item).pipe(
      tap((response:any) => {

      })
    );
  }

  signup(item: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/create-participant', item);
  }
  logout(id:any): Observable<any> {
    return this.http.get(environment.apiUrl + 'auth/logout/'+id, );
  }
 
 check(item: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/email-verification', item).pipe(
      tap((response:any) => {
        // Stocker le token dans le localStorage
        //console.log("response",response);
        
       // console.log(" response?.data?.remember_token", response?.data?.remember_token);
        const token = response?.data?.remember_token;
        if (token) {
          localStorage.setItem('access_token_mairie_toffo', token);
        } else {
          console.warn('Token non défini dans la réponse');
        }
      })
    );
  }

  getLastLogin(): string | null {
    return localStorage.getItem('last_login');
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token_mairie_toffo');
    return !!token && token !== 'undefined';
  }
  

  updateProfil(item: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/change-user-password', item);
  }
  updateProfilImage(item: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/update-user', item);
  }

 

}
