import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private cvDataSubject = new BehaviorSubject<any>({});
  cvData$ = this.cvDataSubject.asObservable();

  updateCvData(cvData: any) {
    this.cvDataSubject.next(cvData);
  }
}