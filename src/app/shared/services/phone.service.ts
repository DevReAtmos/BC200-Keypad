import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  constructor(
    private http: HttpClient,
  ) { }


  // getPhoneNumber(){
  //   return this.http.get('http://raspberrypi.local:5000/get-phone-number');
  // }

  // clearPhoneNumber(){
  //   return this.http.get('http://raspberrypi.local:5000/clear-phone-number');
  // }
  
  getPhoneNumber() {
    return this.http.get('http://raspberrypi.local:5000/get-phone-number');
  }

  clearPhoneNumber(): Observable<any> {
    return this.http.post('http://raspberrypi.local:5000/clear-phone-number',{});
  }

 

}
