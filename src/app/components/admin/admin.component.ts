import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{
  

    constructor(
      private route: Router,private http: HttpClient
    ) {
       
     }

    ngOnInit() {}

    

    logout() {

      this.route.navigate(['/home']);
    }

}

