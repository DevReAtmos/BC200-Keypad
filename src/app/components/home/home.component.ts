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
  subscription!: Subscription;
  subscription1!: Subscription;
  // subscription2!:Subscription;
  binStatus:boolean =false;

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
          console.log("In subscription",result);
          this.router.navigateByUrl('bottle');
          // this.subscription1 = timer(0,190).pipe(
          //   switchMap(()=>this.checkBinStatus())
          // ).subscribe(
          //   (result1:any) =>{
          //     if(result1['sensor'] =="on" ){
          //       console.log("In subscription1",result1);
          //       this.router.navigateByUrl('binful');
          //     }
          //     else if(result1['sensor'] =="off" && result['sensor'] =="on"){
          //       this.router.navigateByUrl('bottle');
          //     }
          //   }
          // );
          
        }
      }
    );
    this.subscription1 = timer(0,1000).pipe(
      switchMap(()=>this.checkBinStatus())
    ).subscribe(
      (result:any)=>{
        if(result['sensor']=="on"){
           console.log("In subscription1",result);
          //  this.subscription.unsubscribe();
          //  this.subscription1.unsubscribe();
           this.router.navigateByUrl('binful');
                
        }
      }
    );



   }
  ngOnInit() {
  }
  
  
  checkSensorData(){

    return this.sensorService.checkSensor();
  }
  checkBinStatus(){
    return this.sensorService.checkBinful();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.subscription1.unsubscribe();
    this.subscription1.unsubscribe();
    // this.subscription2.unsubscribe();
  }

  // binStatusfun(){
  //   setTimeout(() => {
  //     this.binStatus =false;
  //   }, 5000);
  // }

}

