import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class VoyageurService {

  readonly _lognnInfo = new BehaviorSubject<any>(null);
  readonly lognnInfo$ = this._lognnInfo.asObservable();

  constructor() { }
}
