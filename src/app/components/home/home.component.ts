import { Component } from '@angular/core';
import { CheckSensorServiceService } from 'src/app/shared/services/check-sensor-service.service';
import { Subscription, switchMap, timer } from 'rxjs';
import { Router } from '@angular/router';
import { PhoneService } from 'src/app/shared/services/phone.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  sensorData: any;
  subscription: Subscription;
  


  constructor(
    private phoneService: PhoneService,
    private dataService: DataService,
    private sensorService: CheckSensorServiceService,
    private router: Router,
  ) {

    this.phoneService.clearPhoneNumber();
    this.dataService.clearUserData();

    this.subscription = timer(0,200).pipe(
      switchMap(()=>this.checkSensorData())
    ).subscribe(
      (result:any)=>{
        if(result['sensor']=="on"){
          this.router.navigateByUrl('bottle');
        }
      }
    );


   }
  ngOnInit() {
  }
  
  
  checkSensorData(){

    return this.sensorService.checkSensor();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.subscription2.unsubscribe();
  }

}

