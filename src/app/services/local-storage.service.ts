import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getData(key: string) {
    if(key) {
      const localStorageData = localStorage.getItem(key);
      if(localStorageData) {
        return JSON.parse(localStorageData);
      }
    }
  }
}
