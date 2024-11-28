import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, switchMap, timer } from 'rxjs';
import { ControllButtonService } from 'src/app/shared/services/controll-button.service';
import { CounterService } from 'src/app/shared/services/counter.service';
import { DataService } from 'src/app/shared/services/data.service';
import { PhoneService } from 'src/app/shared/services/phone.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent {

  phone: string = '1234567890';
  url: string = 'https://www.reatmos.com/';

  data: any;
  dataString: string = '';
  currentDate = new Date();
  date =this.currentDate.toISOString().split('T')[0];
  subscription: Subscription;
  subscription1: Subscription;
  bottle_count =0;
  location ="Ahmedabad";
  Coin_Earned =0;
  QRvalue ="";
  myInterval :any;
  countdown =60;
  isCountingStart = true;
  
  constructor(
    private router: Router,
    private dataService: DataService, 
    private phoneService: PhoneService, 
    private counterService: CounterService,
    private controllButtonService :ControllButtonService
  ) { 
      this.isCountingStart =true;
      this.timedStartCounter();
      this.data ={};
      this.phone = this.dataService.getPhoneNumber();
      this.data['phone'] = this.dataService.getPhoneNumber();
      this.data['bottles'] = this.dataService.getBottles();
      this.bottle_count = this.dataService.getBottles();
      this.Coin_Earned = this.bottle_count * 3;
      this.data['coins']  =this.Coin_Earned;
      this.dataString = JSON.stringify(this.data);
      this.QRvalue =this.getObjectAsString(this.myObject());
      console.log("QR value is",this.QRvalue);
  

      this.subscription = timer(0,1000).pipe(
        switchMap(()=>this.isCancelPressed())
      ).subscribe(
        (result:any)=>{
          console.log("cancel",result);
          if(result['cancel']=='yes'){
              // console.log("Valid phone no!");
              // this.dataService.addBottles();
              // console.log("Phone no saved");
              this.postingdata();
              this.stopCounter();
              this.router.navigateByUrl('home');
              console.log("routing in home win");
              this.subscription.unsubscribe();
        
          }
        }
      );

      this.subscription1= timer(0,300).pipe(
        switchMap(()=>this.getControllButton())
      ).subscribe(
        (result:any)=>{
          if(result['next']=='yes'){ 
              this.stopCounter();
              this.postingdata();    
              this.router.navigateByUrl('thank');
              console.log("routing in thank win");
              this.subscription1.unsubscribe();          
          }
        }
      );
  
  }

  myObject(){
    return{
    Date: this.date,
    Recycled_items: this.bottle_count,
    Location:"Ahmedabad",
    Coin_Earned:this.Coin_Earned,
    Phone_no:this.phone,
    transaction_id: uuidv4(),
    };
  }

  getControllButton(){
    return this.controllButtonService.isNextPressed();
  }

 

  getObjectAsString(obj: any): string {
    return JSON.stringify(obj);
  }
  
  isCancelPressed(){
    return this.controllButtonService.isCancelpressed();
  }

  ngOnInit() {

  }
  startCountdown1() {
    if (this.myInterval) {
      clearInterval(this.myInterval);
    }
  
    this.isCountingStart = true;
  
    const countdownFunction = () => {
      this.countdown -= 1;
      console.log(" 3After decreasing counter by 1", this.countdown);
  
      if (this.countdown <= 0) {
        this.isCountingStart = false;
       
        clearInterval(this.myInterval);
        this.postingdata();
        this.clearUserData();
        this.router.navigateByUrl('thank');
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

postingdata(){
  this.dataService.getData(this.dataString).subscribe(
    (res)=>{
       console.log('Data saved suceessfully:',res);

    },
   (error) => {
    console.error('Error saving data:', error);
   }
   );
}

private  clearUserData() {
  console.log("clear user data function called")
  this.dataService.clearUserData();
  this.phoneService.clearPhoneNumber();
  console.log("clear data")
}


ngOnDestroy(){
  this.stopCounter();
  this.clearUserData();
  this.subscription.unsubscribe();
  this.subscription1.unsubscribe();
  
}

}
