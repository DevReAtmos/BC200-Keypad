import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelayService {

  constructor(
    private http: HttpClient
  ) { 
    
  }

  turnOnRelay(){
    return this.http.post('http://raspberrypi.local:5000/trigger-crusher', {
      "trigger": "on"
    });
  }

  turnOffRelay(){
    return this.http.post('http://raspberrypi.local:5000/trigger-crusher', {
      "trigger": "off"
    });
  }
}
