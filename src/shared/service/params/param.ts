import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { LocalStorageService } from '../storage/localstorage.service';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';



@Injectable({
  providedIn: 'root'
})

export class ParameterService {


  constructor(private http: HttpClient) {

  }

  addProposition(item:any): Observable<any> {
    return this.http.post(`${environment.apiUrl + 'operation/proposition/save'}`,item);
  }

   gethematique(): Observable<any> {
    return this.http.get(`${environment.apiUrl + 'params/thematiques'}`);
  }
}


