import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  //API_URL = 'http://empower360plus.net/';
  API_URL = 'http://localhost:5010/';
  constructor() { }
}
