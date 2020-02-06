import { Injectable } from '@angular/core';
import { ToDo } from '../../todo';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  private key = 'todoStorage';
  private defaultStorage:Array<ToDo> = [];

  constructor() { 
    this.defaultStorage = localStorage.getItem(this.key) ? JSON.parse(localStorage.getItem(this.key)) : [];
  }

  get(): any {
    return this.defaultStorage;
  }

  save( data:ToDo ): void {
    this.defaultStorage.push(data);
    localStorage.setItem(this.key, JSON.stringify(this.defaultStorage));
  }

  update(data:Array<ToDo>): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

}
