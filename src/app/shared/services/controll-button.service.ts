import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ControllButtonService {

  constructor(
    private http: HttpClient,
  ) { }
  
  isNextPressed(): Observable<any> {
    console.log("in next pressed function");
    return this.http.get('http://test2024:5000/get-next-status');
  }

  isCancelpressed() :Observable<any> {
    console.log("in cancel pressed function");
    return this.http.get('http://test2024:5000/get-cancel-status');
  }

  isClearpressed():Observable<any> {
    console.log("in clear pressed function");
    return this.http.get('http://test2024:5000/get-cancel-status');
  }

  // isNextPressed(){
  //     console.log("in next pressed function")
  //     return this.http.get('http://raspberrypi.local:5000/get-next-status')

  // }
}
