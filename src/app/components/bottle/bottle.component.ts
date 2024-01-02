import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, timer,switchMap, delay, BehaviorSubject, Observable, interval, takeWhile} from 'rxjs';
import { CheckSensorServiceService } from 'src/app/shared/services/check-sensor-service.service';
import { ControllButtonService } from 'src/app/shared/services/controll-button.service';
import { DataService } from 'src/app/shared/services/data.service';
import { RelayService } from 'src/app/shared/services/relay.service';
import { Subject } from 'rxjs';
import { CounterService} from 'src/app/shared/services/counter.service';

@Component({
  selector: 'app-bottle',
  templateUrl: './bottle.component.html',
  styleUrls: ['./bottle.component.scss']
})
export class BottleComponent {

  isCrushing = false;
  counter = 0;
  countdown =30;
  isCountingStart = false;

  isNextPressed: boolean = false;
  subscription1: Subscription;
  subscription2: Subscription;
  phoneWin : boolean =false;
  myInterval :any;

  constructor(
    private toastrService: ToastrService,
    private sensorService: CheckSensorServiceService,
    private controllButtonService: ControllButtonService,
    private relayService: RelayService,
    private dataService: DataService,
    private router: Router,
    private counterService: CounterService
    
  ) {
      // this.counterStart();
      this.subscription1 = timer(0,100).pipe(
        switchMap(()=>this.checkSensorData())
      ).subscribe(
        (result:any)=>{
          console.log("bottle subscription1:",result);
          if(result['sensor']=="on"){            
            if(!this.isCrushing){
              this.isCrushing = true;
              this.isCountingStart =false;
              // this.status =false;

              this.crushBottle();
                    
            }
               
          }
        }
      );


      this.subscription2 = timer(0,1000).pipe(
        switchMap(()=>this.nextPressed())
      ).subscribe(
        (result:any)=>{
          console.log("In bottle subscription2 ",result)
          if(result["next"]=="yes"){
              this.phoneWin=false;
              this.isCountingStart =false;
              this.countdown = 30;
              this.router.navigateByUrl('phone'); 
                   }
          // else if(result["next"]=="no" && this.phoneWin == true){
          //     console.log("In Bottle else part");
          //     if(!this.isCountingStart){
          //       this.isCountingStart =true;
          //       this.startCountdown1();
          //     }
          //     if(this.countdown == 0){
          //       this.router.navigateByUrl('home');
          //     }
   
          //     }
             
              
          }
      
      );
    }
  
  ngOnInit() {

  }
  

  checkSensorData(){

    return this.sensorService.checkSensor();
  }
  

  
  nextPressed(){
    return this.controllButtonService.isNextPressed();
  }

  turnOnRelay(){
      this.relayService.turnOnRelay();
  }

  turnOffRelay(){
    this.relayService.turnOffRelay();
  }

  crushBottle(){
    this.stopCounter();
    this.isCrushing = true;
    this.phoneWin =true;
    this.turnOnRelay();
    console.log("In crushbottle fun",this.counter);
      setTimeout(() => {
        this.isCrushing = false;
        this.dataService.addBottles();
        this.counter += 1;
        console.log("Bottle count",this.counter);
        this.dataService.addBottles();
        this.turnOffRelay() ; 
        this.isCountingStart =false;
        this.timedStartCounter();
        
        
      }, 5000);     
     
  }



  timedStartCounter(){
   
      this.isCountingStart=true;
      this.restartCountdown();
  
  }

  restartCountdown(){
    this.countdown =30;
    this.isCountingStart = true;
    this.startCountdown1();
  }
  stopCounter(){
    this.isCountingStart =false;

  }

  ngOnDestroy(): void {
    // this.phoneWin =false;
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
 
  startCountdown1() {
    if (this.myInterval) {
      clearInterval(this.myInterval);
    }
  
    this.isCountingStart = true;
    this.phoneWin = true;
    console.log("In startCountdown method", this.counter);
  
    const countdownFunction = () => {
      this.countdown -= 1;
      console.log("After decreasing counter by 1", this.countdown);
  
      if (this.countdown <= 0) {
        this.isCountingStart = false;
        if (this.myInterval) {
          clearInterval(this.myInterval);
        }
        this.router.navigateByUrl('home');
      }
    };
  
    countdownFunction(); 
  
    this.myInterval = setInterval(countdownFunction, 1000);
  }
  
 
  
}






  //  For countdown function
  // startCountdown(){
  //   this.isCountingStart = true;
  //   this.phoneWin =true;
  //   console.log("In startCountdown methos",this.counter);
  //   const countdownFunction =() =>{
  //     this.countdown -= 1;
  //     console.log("After decreasing counter by 1",this.countdown);

  //     if (this.countdown > 0 && this.isCountingStart) {
  //       console.log("startCountdown vfunction called");
  //       setTimeout(countdownFunction, 1000); 
  //   } else {
  //     this.isCountingStart =false;
  //     // this.countdown =30;
  //     this.router.navigateByUrl('home');
  //   }
  //   }
  //     setTimeout(countdownFunction,1000);       
     
  // }

  