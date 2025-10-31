import { BehaviorSubject } from "rxjs";

export class FecthDataService {
    private ServiceCreatedSubject = new BehaviorSubject<boolean>(false);
    actionCreated$ = this.ServiceCreatedSubject.asObservable();
  
    notifySeriviceCreated() {
      this.ServiceCreatedSubject.next(true);
    }

    reset() {
      this.ServiceCreatedSubject.next(false);
    }
    
  }

