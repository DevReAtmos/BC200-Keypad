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

  
  // isCrushing = false;
  isCrushing = true;
  counter = 0;
  countdown =30;
  isCountingStart = false;
  // flag =0;
  isNextPressed: boolean = false;
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;
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
      this.crushBottle();
      // 100
      this.subscription1 = timer(0,700).pipe(
        switchMap(()=>this.checkSensorData())
      ).subscribe(
        (result:any)=>{
          console.log("bottle subscription1:",result);
          if(result['sensor']=="on"){                     
            if(!this.isCrushing){                       
              this.isCrushing = true;                   
              this.isCountingStart =false;  
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
              this.isCountingStart =false;
              this.stopCounter();
              // this.countdown = 30;        
              this.router.navigateByUrl('phone'); 
                   }         
              
          }
      
      );
    
      this.subscription3 = timer(0,700).pipe(
        switchMap(()=>this.isBottleDetected())
      ).subscribe(
        (result:any)=>{
          console.log("In bottle subscription3 ",result)
          if(result["sensor"]=="on"){
            this.counter += 1;
            console.log("count value is ",this.counter);
            this.dataService.addBottles();
                   }
             
          }
      
      );
      this.subscription4 = timer(0,1000).pipe(
        switchMap(()=>this.cancelPressed())
      ).subscribe(
        (result:any)=>{
          console.log("In bottle subscription4 ",result)
          if(result["cancel"]=="yes"){
              this.isCountingStart =false;
              this.stopCounter();
              // this.countdown = 30;        
              this.router.navigateByUrl('home'); 
                   }         
              
          }
      
      );
      

    }
  
  ngOnInit() {

  }
  

  checkSensorData(){

    return this.sensorService.checkSensor();
  }
  
  isBottleDetected(){
    
    return this.sensorService.checkBottle();
  }
  
  nextPressed(){
    return this.controllButtonService.isNextPressed();
  }

  cancelPressed(){
    return this.controllButtonService.isCancelpressed();
  }

  turnOnRelay(){
     
      this.relayService.turnOnRelay().subscribe(
         (res)=>{
          console.log("relay high",res);
         },
         (error) => {
              console.error('Error saving data:', error);
             }
          //    );
      );

  }

  turnOffRelay(){
    this.relayService.turnOffRelay().subscribe(
      (res)=>{
        console.log('turn off relay:',res);
      },
      (error) => {
            console.error('error occuring when turning off ', error);
          }
    );
  }

  crushBottle(){
    this.stopCounter();
    this.isCrushing = true;
    this.phoneWin =true;
    this.turnOnRelay();
    console.log("In crushbottle fun",this.counter);
    setTimeout(() => {
      this.turnOffRelay();
      console.log("Turned off relay");
  }, 1000); // Call turnOffRelay() after 1 second
      setTimeout(() => {
        this.isCrushing = false;  
        console.log("Is crushing value setting to ",this.isCrushing);  
        // this.counter += 1;
        
        // this.dataService.addBottles();
        // this.turnOffRelay() ; 
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
    clearInterval(this.myInterval);

  }

  ngOnDestroy(): void {
    // this.phoneWin =false;
    console.log("Ng destroy called1");
    if(this.myInterval){
      clearInterval(this.myInterval);
    }
    console.log("Ng destroy called2");
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    this.subscription4.unsubscribe();
    console.log("Ng destroy called3");
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
      console.log("1After decreasing counter by 1", this.countdown);
  
      if (this.countdown <= 0) {
        this.isCountingStart = false;
        clearInterval(this.myInterval);
        this.router.navigateByUrl('home');
      }
    };
  
    countdownFunction(); 
  
    this.myInterval = setInterval(countdownFunction, 1000);
  }
  
 
  
}





