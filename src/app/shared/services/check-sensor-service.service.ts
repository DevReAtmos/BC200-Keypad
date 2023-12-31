import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckSensorServiceService {

  constructor(
    private http:HttpClient
  ) {
      
  }

  checkSensor(){
    return this.http.get('http://raspberrypi.local:5000/get-sensor-data');
    
  }

}
