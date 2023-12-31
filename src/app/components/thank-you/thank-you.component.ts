import { Component ,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from '../../shared/services/data.service';
import {PhoneService} from '../../shared/services/phone.service'
import { Subscription, switchMap, timer } from 'rxjs';
@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  phone: string = '1234567890';
  url: string = 'https://www.reatmos.com/';
  data: any;
  dataString: string = '';
  
  constructor(
    private router: Router,
    private dataService: DataService,
    private phoneService: PhoneService,
  ) {
    this.data = {};
    this.data['phone'] = this.dataService.getPhoneNumber();
    this.data['bottles'] = this.dataService.getBottles();
    this.dataString = JSON.stringify(this.data);

    // this.subscription1 = timer(0,300).pipe(
    //   switchMap(()=>this.clearPhoneNumber())
    // ).subscribe(
    //   (result:any)=>{
    //     console.log(" result of Phone no is",result)
    //     this.phone = result['phone'];
        
    //   }
    // );
    this.dataService.getData(this.dataString).subscribe(
      (res)=>{
         console.log('Data saved suceessfully:',res);
  
      },
     (error) => {
      console.error('Error saving data:', error);
     }
     );
    
     
    
  }

  

  private  clearUserData() {
    console.log("clear user data function called")
    this.dataService.clearUserData();
    this.phoneService.clearPhoneNumber();
    console.log("clear data")
  }

    
  // ngOnDestroy(): void {
  //   this.subscription1.unsubscribe();
  //   this.subscription2.unsubscribe();
  // }
 
  ngOnInit() {
    this.clearUserData()
      console.log("Directing to Home win")
      setTimeout(()=>{
        this.router.navigateByUrl('home');
      }, 10000);
      
    };

  }
 
