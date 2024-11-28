import { Component ,OnDestroy ,OnInit} from '@angular/core';
import {CounterService} from "../app/shared/services/counter.service";
import { interval, Subscription ,Observable} from 'rxjs';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit ,OnDestroy {
  title = 'reatmos_machine_sensor';
  status = false;
  // countdown =0;
  // countdown$!: Observable<number>; 
  private subscription!: Subscription;
  public countdown:number=30;
  intervalId :any;
  constructor(
    public counterService : CounterService,
    private router: Router,
    private zone: NgZone
  ){
      
    }
    // getstatus(){
    //   this.status = this.counterService.getstatus();
    // }
   
    //  startCounter() {
    //   this.zone.runOutsideAngular(()=>{
    //   this.subscription = interval(1000).subscribe(() => {
    //   this.getstatus();
    //     if(this.status){ 
    //       this.counterService.startCounter();
    //       this.zone.run(()=>{
    //         this.countdown=this.counterService.countdown;
    //         console.log("countdown subjectvalue",this.countdown);
    //       });
         
    //     }
    //     });     
    //     });
    //   }
    
   
    
    ngOnInit(): void {
      // console.log("printing log of status" ,this.status);
      // this.startCounter();
      
    }
    ngOnDestroy(): void {
      // Unsubscribe in ngOnDestroy to prevent memory leaks
      // this.subscription.unsubscribe();
    }
 
  

    

}

