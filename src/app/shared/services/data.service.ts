import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  bottles:number=0;
  phoneNumber:string="";
  

  constructor(
    private http: HttpClient,
    ) { 

    }

  getBottles(){
    return this.bottles;
  }

  getPhoneNumber(){
    return this.phoneNumber;
  }

  addBottles(){
    this.bottles+=1;
  }

  addPhoneNUmber(number:string){
    this.phoneNumber=number;
  }

  clearUserData(){
    this.bottles=0;
    this.phoneNumber="";
  }
   
  getData(data :any):Observable<any> {
    return this.http.post('http://raspberrypi.local:5000/offline-data',data);
  }

}