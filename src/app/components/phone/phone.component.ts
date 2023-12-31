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
  destroy$: any;

  constructor(
    private phoneService: PhoneService,
    private dataService: DataService,
    private controllButtonService: ControllButtonService,
    private router: Router,
    
  ){

    // this.subscription1 = this.phoneService.getPhoneNumber().subscribe(
    //   (result: any) => {
    //     console.log("Result of Phone no is", result);
    //     this.phoneNumber = result['phone'];
    //   }
    // );
    this.subscription1 = timer(0,300).pipe(
        switchMap(()=>this.getPhoneNumber())
      ).subscribe(
        (result:any)=>{
          console.log(" result of Phone no is",result)
          this.phoneNumber = result['phone'];
          
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
              this.router.navigateByUrl('thank');
              console.log("routing in thank win");
            }
            else{
              this.errorMessage ="PLEASE ENTER A 10 DIGIT PHONE NUMBER";
            }
            
          }
        }
      );
   

  }
  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
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
  
  saveDataAndGotoQrcode(){
    this.dataService.addPhoneNUmber(this.phoneNumber);
    this.router.navigateByUrl('qrcode');
  }
  
  ngOninit() {}
}
