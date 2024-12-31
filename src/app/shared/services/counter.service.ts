import { Injectable,} from '@angular/core';
import { interval,Subscription ,BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  // private countdownSubject: BehaviorSubject<number> = new BehaviorSubject<number>(30);
  

  isCounterSet: boolean = false;
  CountStatus: boolean = false;
  CountValue = 0;
  Status:boolean =false;
  status:boolean =false;
  counterTime: number = 0;
  
  private subscription!: Subscription;
  public countdown:number=30;
  intervalId :any;
  
  constructor(private router: Router,) { 
    
  }

  // startCounter(){
  //  this.intervalId =setInterval(()=>{
  //    if 
  //  },1000);
   
  // }

  startCounter(){
    this.subscription =interval(1000).subscribe(()=>{
      const status =this.getstatus();
      console.log("printing log of status" ,this.status);
      if (status && this.countdown>0) {
          this.countdown = this.countdown -1;
          console.log("counter value",this.countdown);
        }
      else if(this.countdown < 1){
           this.status =false;
           this.resetcountdown();
           this.stopcounter();
           this.subscription.unsubscribe();
           this.router.navigateByUrl("home");
          
      }
   });
  }
  
 
  counterSet(seconds:number){
    this.counterTime = seconds;
    this.isCounterSet = true;
  }
  
  counterDisable(){
    this.isCounterSet = false;
    this.counterTime = 0;
  }
  timer()
  {
    return this.CountValue += 1;
  }
  resetTimer()
  {
    this.CountStatus=false;
    this.CountValue=0;
  }
 
  // setcountStatus(){
  //   this.Status = true;
  // }
  // getCountStatus(){
  //   return this.Status;
  // }
  getstatus(){
    return this.status
  }
  setstatus(){
    this.status =true;
  }
  resetcountdown(){
    this.countdown =30;
    // this.countdownSubject.next(30);
  }
  stopcounter(){
    console.log("stop counter method called");
    // this.countdownSubject.next(30);
    this.countdown =30;
    this.status =false;
  }
  getcountdown(){
    return this.countdown;
  }
} 


 // startCounter() {
  //   this.subscription = interval(1000).subscribe(() => {
  //     // this.getstatus();
  //     const status = this.getstatus();
  //     console.log("printing log of status" ,this.status);
  //     if (status && this.countdown > 0) {
  //       this.countdown--;
  //       // console.log('countdown value', this.countdown);
  //     } else if (this.countdown <= 0) {
  //       // You can perform any action when the countdown reaches zero here
  //       this.status = false;
  //       console.log("status updated to false",this.status);
  //       this.subscription.unsubscribe(); // Stop the interval
  //       // this.countdown = 30; // Reset countdown to initial state
  //       // this.startCounter(); // Restart the countdown
  //       this.stopcounter();
  //       this.router.navigateByUrl("home");
  //     }
  //     // else {
  //     //   this.status =false;
  //     //   this.stopcounter();
  //     // }
  //   });
  // }