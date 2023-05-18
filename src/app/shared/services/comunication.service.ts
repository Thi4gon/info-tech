

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ComunicationService {
    constructor() { }

  currentDate = new BehaviorSubject<any>('');

  currentDate$ = this.currentDate.asObservable();

  sendNextDate(date:any){
    this.currentDate.next(date);
  }

  isDarkMode = new BehaviorSubject<any>('');

  isDarkMode$ = this.isDarkMode.asObservable();

  sendDarkmode(theme:boolean){
    this.isDarkMode.next(theme);
  }

}
