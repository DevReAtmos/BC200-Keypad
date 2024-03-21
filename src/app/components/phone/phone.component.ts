import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, switchMap, timer } from 'rxjs';
import { ControllButtonService } from 'src/app/shared/services/controll-button.service';
import { DataService } from 'src/app/shared/services/data.service';
import { PhoneService } from 'src/app/shared/services/phone.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent {

  phoneNumber:string = "123-456-7890";
  errorMessage: string =""
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;
  myInterval :any;
  countdown =60;
  isCountingStart = true;
  destroy$: any;

  constructor(
    private phoneService: PhoneService,
    private dataService: DataService,
    private controllButtonService: ControllButtonService,
    private router: Router,
    
  ){
    this.isCountingStart =true;
    this.timedStartCounter();
    this.subscription1 = timer(0,300).pipe(
        switchMap(()=>this.getPhoneNumber())
      ).subscribe(
        (result:any)=>{
          console.log(" result of Phone no is",result)
          this.phoneNumber = result['phone'];
          // this.timedStartCounter();
          
        }
      );
      
      this.subscription2 = timer(0,300).pipe(
        switchMap(()=>this.getControllButton())
      ).subscribe(
        (result:any)=>{
          if(result['next']=='yes'){
            console.log("Before validation:", this.phoneNumber);
            console.log("Validation result:", /^\d{10}$/.test(this.phoneNumber));

            if(this.isValidPhoneNumber()){
              console.log("Valid phone no!");
              this.dataService.addPhoneNUmber(this.phoneNumber);
              console.log("Phone no saved");
              this.router.navigateByUrl('qrcode');
              console.log("routing in thank win");
              this.subscription2.unsubscribe();
            }
            else{
              this.errorMessage ="PLEASE ENTER A 10 DIGIT PHONE NUMBER";
              this.timedStartCounter()

            }
            
          }
        }
      );

      this.subscription3 = timer(0,1000).pipe(
        switchMap(()=>this.isCancelPressed())
      ).subscribe(
        (result:any)=>{
          console.log("cancel called",result);
          if(result['cancel']=='yes'){
              // console.log("Valid phone no!");
              // this.dataService.addBottles();
              // console.log("Phone no saved");
              this.router.navigateByUrl('home');
              console.log("routing in home win");
              this.subscription3.unsubscribe();
        
          }
        }
      );
      
      this.subscription4 = timer(0,1000).pipe(
        switchMap(()=>this.isClearPressed())
      ).subscribe(
        (result:any)=>{
          console.log("clear called",result);
          if(result['clear']=='yes'){
              this.timedStartCounter()
              console.log("counter function restart");
              // this.subscription4.unsubscribe();
        
          }
        }
      );

  }
  ngOnDestroy(): void {
    console.log("NgOnDestory function called");
    this.stopCounter();
    // clearInterval(this.myInterval);
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    this.subscription4.unsubscribe();
  }
  getPhoneNumber(){
   return  this.phoneService.getPhoneNumber();
  }
  isValidPhoneNumber() {
    return this.phoneNumber && /^\d{10}$/.test(this.phoneNumber) && this.phoneNumber.length === 10;
  }
  
  getControllButton(){
    return this.controllButtonService.isNextPressed();
  }

  isCancelPressed(){
    return this.controllButtonService.isCancelpressed();
  }
  isClearPressed(){
    return this.controllButtonService.isClearpressed();
  }
  
  saveDataAndGotoQrcode(){
    this.dataService.addPhoneNUmber(this.phoneNumber);
    this.router.navigateByUrl('qrcode');
  }


  startCountdown1() {
    if (this.myInterval) {
      clearInterval(this.myInterval);
    }
  
    this.isCountingStart = true;
  
    const countdownFunction = () => {
      this.countdown -= 1;
      console.log("2After decreasing counter by 1", this.countdown);
  
      if (this.countdown <= 0) {
        this.isCountingStart = false;
        
        clearInterval(this.myInterval);
        
        this.router.navigateByUrl('home');
      }
    };
  
    countdownFunction(); 
  
    this.myInterval = setInterval(countdownFunction, 1000);
  }

  timedStartCounter(){
   
    this.isCountingStart=true;
    this.restartCountdown();

}

restartCountdown(){
  this.countdown =60;
  this.isCountingStart = true;
  this.startCountdown1();
}
stopCounter(){
  this.isCountingStart =false;
  clearInterval(this.myInterval);

}


  
  ngOninit() {
    
    
  }
}
