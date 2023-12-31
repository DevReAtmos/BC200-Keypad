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
  countdown =0;
  iscountercalled:boolean=false;
  isCrushing = false;
  counter = 0;
  countertime =30;
  temp =0;
  status:boolean=false;
  countdownvalue =30;
  isNextPressed: boolean = false;
  subscription1: Subscription;
  subscription2: Subscription;
  phoneWin : boolean =false;
  intervalId :any;
  // private destroy$ = new Subject<void>();
  private countdownSubject = new BehaviorSubject<number>(30); // Initial countdown value
  public countdown$: Observable<number> = this.countdownSubject.asObservable();
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
              this.status =false;

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
          if(result["next"]=="yes" && this.phoneWin == true){
              this.phoneWin=false;
              // this.countertime = 0;
              this.resetTimer();
              this.stopcounter();
              this.resetcountdown();
              // this.counterService.stopcounter();
              this.router.navigateByUrl('phone'); 
                   }
          else if(result["next"]=="no" && this.phoneWin == true){
              // this.phoneWin =false;
              console.log("In Bottle else part");
              this.status=true;
              // this.iscountercalled =true;
              if(!this.iscountercalled && this.status){
                // this.iscountercalled =false;
                this.startCountdown();
                this.countdown$.subscribe((countdownValue)=>
                {
                  console.log("countdownValue$" ,countdownValue);
                  if(countdownValue === 0){
                       this.status =false;
                       this.iscountercalled =false;
                       console.log("status chnage to false ",this.status);
                       this.router.navigateByUrl('home');
                  }
                });
                
               
              }
             
              
          }
        }
      );

   }
  
  ngOnInit() {

  }
  getcountstatus(){
    this.countdownvalue =this.counterService.countdown;
  }

  checkSensorData(){

    return this.sensorService.checkSensor();
  }
  
  // counterSatus(){
  //   this.counterService.setcountStatus();
  // }
  
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
    this.isCrushing = true;
    this.phoneWin =true;
    this.turnOnRelay();
    // this.status =true;
    // this.resetTimer();
    this.resetcountdown();
    console.log("In crushbottle fun",this.counter);
      setTimeout(() => {
        this.isCrushing = false;
        this.dataService.addBottles();
        this.counter += 1;
        console.log("Bottle count",this.counter);
        // this.counterService.stopcounter();
        this.resetCountdown1();        // this.stopcounter();
        this.dataService.addBottles();
        this.turnOffRelay() ; 
        
      }, 5000); 
      
      // this.getcountdown();
      // this.getcountstatus();
      
     
  }

 
  startCountdown(): void {
    interval(1000)
      .pipe(takeWhile(() => this.countdownSubject.value > 0))
      .subscribe(() => {
        this.countdownSubject.next(this.countdownSubject.value - 1);
      });
  }

  resetCountdown1(): void {
    this.countdownSubject.next(30); // Reset countdown to 30 seconds
  }

  
// counterStart(){
//   // this.phoneWin =false;
//   this.intervalId = setInterval(()=>
//   {
//    if (this.countdownvalue > 0) {
//      this.status =true;
//      this.countdownvalue--;
//      console.log("countdownvalue is ",this.countdownvalue);
//    } else {
//      clearInterval(this.intervalId);
//      this.status =false;
//      this.resetcountdown();
//     //  this.stopcounter();
//     //  this.phoneWin =false;
//     this.iscountercalled =false;
//      console.log("status setting4 false",this.status);
//      this.router.navigateByUrl('home');
//      // You can perform any action when the countdown reaches zero here
     
//    }
//   },1000);
//  }
  


  resetTimer()
  {
    return this.counterService.resetTimer();
  }

  timer()
  {
    return this.counterService.timer();
  }

  resetcountdown(){

    this.countdownvalue =30;
    console.log("counter value is resetting to 3o",this.countdownvalue);
    // this.counterService.resetcountdown();
  }
  // startcountdown(){
  //   return this.counterService.startCountdown();
  // }
  // startcountdown(){
  //   return this.counterService.counterStart();
  // }
  getcountdown(){
    this.counterService.startCounter()
  }
  ngOnDestroy(): void {
    // this.phoneWin =false;
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
  getstatus(){
    this.status =this.counterService.getstatus();
  }
  getcountdownvalue(){
    this.countdown = this.counterService.getcountdown();
  }
  stopcounter(){
    console.log("stop counter method called");
    this.status =false;
    this.countdownSubject.next(30);
    // this.countdownvalue= 30;
  }
}