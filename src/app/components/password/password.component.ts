import { Component } from '@angular/core';
import { ControllButtonService } from 'src/app/shared/services/controll-button.service';
import { PasswordService } from 'src/app/shared/services/password.service';
import { Subscription, switchMap, timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {
 password:string = "12345";
 errorMessage:string="";
 user_password:string ="";
 subscription1: Subscription;
 subscription2: Subscription;
 subscription3: Subscription;
 subscription4: Subscription;
 countdown =60;
 isCountingStart = true;
 myInterval :any;
//  subscription4: Subscription;

  constructor (
    private passwordService :PasswordService,
    private controllButtonService :ControllButtonService,
    private router: Router,)
    {
      this.isCountingStart =true;
      this.timedStartCounter();
      this.subscription1 = timer(0,300).pipe(
        switchMap(()=>this.getPassword())
      ).subscribe(
        (result:any)=>{
          console.log(" result of Phone no is",result)
          this.user_password = result['password'];
          // this.timedStartCounter();
          
        }
      );

      this.subscription2 = timer(0,300).pipe(
        switchMap(()=>this.getControllButton())
      ).subscribe(
        (result:any)=>{
          if(result['next']=='yes'){
           

            this.validatePassword();
            
          }
        }
      );

      this.subscription3 = timer(0,1000).pipe(
        switchMap(()=>this.isCancelPressed())
      ).subscribe(
        (result:any)=>{
          console.log("cancel called",result);
          if(result['cancel']=='yes'){
             this.user_password = "";
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

   // Validate user entered password
   validatePassword() {
    if (this.user_password === this.password) {
      // If password is correct, navigate to admin
      this.router.navigateByUrl('password/admin');
      this.subscription2.unsubscribe(); // Unsubscribe from next button check
    } else {
      // If password is incorrect, show error and reset countdown
      this.errorMessage = "Please enter the correct password";
      this.timedStartCounter();
    }
  }

  

  getPassword(){
    return  this.passwordService.getPassword();
   }

   isValidPhoneNumber() {
     return this.passwordService && /^\d{10}$/.test(this.user_password) && this.user_password == "12345";
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
  restartCountdown(){
    this.countdown =60;
    this.isCountingStart = true;
    this.startCountdown1();
  }

  timedStartCounter(){
   
    this.isCountingStart=true;
    this.restartCountdown();

}
}
