import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()

// export class AuthInterceptor implements HttpInterceptor {
  
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // Récupérer le token depuis le localStorage
//     console.log("ddddddddddddddddddddd");

//     const token = localStorage.getItem('access_token_mairie_toffo');

//     // Cloner la requête et ajouter le token si présent
//     if (token) {
//       const cloned = req.clone({
//         headers: req.headers.set('Authorization', `Bearer ${token}`)
//       });
//       return next.handle(cloned);
//     }

//     // Si pas de token, passer la requête telle quelle
//     return next.handle(req);
//   }
// }
// export class AuthInterceptor implements HttpInterceptor {

//   constructor(private router: Router) {
//       //  console.log("access_token_mairie_toffo");

//   }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('access_token_mairie_toffo');
//   //  console.log("access_token_mairie_toffo",token);
    
//     let request = req;

//     if (token) {
//       request = req.clone({
//         headers: req.headers.set('Authorization', `Bearer ${token}`)
//       });
//     }

//     return next.handle(request).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 401) {
//           // Rediriger vers la page de login
//           this.router.navigate(['/login']);
//         }
//         return throwError(() => error);
//       })
//     );
//   }
// }



@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    });
    return next.handle(clonedRequest);
  }
}
