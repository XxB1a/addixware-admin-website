import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  public setkey(key, value) {
    localStorage.setItem(key, value);
  }

  public getKey(key) {
    return localStorage.getItem(key);
  }

}
