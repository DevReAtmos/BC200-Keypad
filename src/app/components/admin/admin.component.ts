import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, switchMap, timer } from 'rxjs';
import { CheckSensorServiceService } from 'src/app/shared/services/check-sensor-service.service';
import { DataService } from 'src/app/shared/services/data.service';
import { ControllButtonService } from 'src/app/shared/services/controll-button.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{
  
    subscription!: Subscription;
    subscription1!:Subscription;
    shutterStatus: boolean = false;
    binFullStatus: boolean = false;
    countStatus: boolean = false;
    bottle_sum =0;
    constructor(
      private route: Router,private http: HttpClient,
      private sensorService :CheckSensorServiceService,
      private dataService :DataService,
      private router: Router,
      private controllButtonService: ControllButtonService,
    ) {
      this.subscription = timer(0,700).pipe(
        switchMap(()=>this.checkSensorData())
      ).subscribe(
        (result:any)=>{
          console.log("result is",result);
          if (result['bin_status'] === 'on') {
            this.binFullStatus =true;
            console.log('Bin is full');
          }
  
          if (result['bottle'] === 'on') {
            this.countStatus =true;
            console.log('Bottle Counted');
          }
  
          if (result['sensor'] === 'on') {
            this.shutterStatus =true;
            console.log('Shutter Opening Detected');
          }
        }
      );
      this.subscription1 = timer(0,1000).pipe(
        switchMap(()=>this.isCancelPressed())
      ).subscribe(
        (result:any)=>{
          console.log("cancel called",result);
          if(result['cancel']=='yes'){
             
              this.router.navigateByUrl('home');
              console.log("routing in home win");
              this.subscription1.unsubscribe();
        
          }
        }
      );

      this.fetchBottleCount();
     }

     fetchBottleCount() {
      this.dataService.fetchBottleCounter().subscribe(
        (response: any) => {
          this.bottle_sum = response.bottle_sum; // Assign fetched bottle sum
          console.log('Bottle Sum Updated:', this.bottle_sum);
        },
        (error) => {
          console.error('Error fetching bottle count:', error);
        }
      );
    }
    isCancelPressed(){
      return this.controllButtonService.isCancelpressed();
    }

     checkSensorData(){

      return this.sensorService.getallSensordata();
    }
   
    ngOnInit() {}

    logout() {

      this.route.navigate(['/home']);
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
      // this.subscription1.unsubscribe();
      this.subscription1.unsubscribe();
      // this.subscription2.unsubscribe();
    }
}

