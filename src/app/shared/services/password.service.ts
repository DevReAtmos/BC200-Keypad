import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(
    private http: HttpClient
  ) { }

  getPassword() {
    return this.http.get('http://test2024:5000/get-password');
  }

  clearPassword(): Observable<any> {
    return this.http.post('http://test2024:5000/clear-password',{});
  }
  
}
