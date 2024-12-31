import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, switchMap, timer } from 'rxjs';
import { CheckSensorServiceService } from 'src/app/shared/services/check-sensor-service.service';

@Component({
  selector: 'app-binful',
  templateUrl: './binful.component.html',
  styleUrls: ['./binful.component.scss']
})
export class BinfulComponent implements OnDestroy {
  subscription:Subscription;
  constructor(private router:Router ,private sensorService:CheckSensorServiceService){
    this.subscription = timer(0,1000).pipe(
      switchMap(()=>this.checkBinStatus())
    ).subscribe(
      (result:any)=>{
        if(result['sensor']=="off"){
           console.log("In subscription1",result);
          //  this.subscription.unsubscribe();
          //  this.subscription1.unsubscribe();
           this.router.navigateByUrl('home');
                
        }
      }
    )

    
  }

   checkBinStatus(){
     return this.sensorService.checkBinful();
   }
   
   ngOnDestroy(){
     this.subscription.unsubscribe();
   }
}
