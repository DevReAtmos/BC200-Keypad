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
    console.log("trigger On");
    return this.http.post('http://test2024:5000/trigger-crusher', {
      "trigger": "on"
    });
  }

  turnOffRelay(){
    console.log("trigger off");
    return this.http.post('http://test2024:5000/trigger-crusher', {
      "trigger": "off"
    });
  }
}


