import { Injectable } from '@angular/core';
import { PositionMapping } from '../models/position-mapping.interface';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getData(key: string): PositionMapping[] | [] {
    if(key) {
      const localStorageData = localStorage.getItem(key);
      
      if(localStorageData) {
        console.log('data', JSON.parse(localStorageData));
        return JSON.parse(localStorageData);
      }
    }

    return [];
  }
}
