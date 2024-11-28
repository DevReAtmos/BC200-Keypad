import { Component ,  OnDestroy,  OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit ,OnDestroy {
  // phone: string = '1234567890';
  // url: string = 'https://www.reatmos.com/';
  // data: any;
  // dataString: string = '';
  
  constructor(
    private router: Router,
    // private dataService: DataService,
    // private phoneService: PhoneService,
  ) {
    setTimeout(()=>{
      this.router.navigateByUrl('home');
    }, 10000);
    
    // this.data = {};
    // this.data['phone'] = this.dataService.getPhoneNumber();
    // this.data['bottles'] = this.dataService.getBottles();
    // this.dataString = JSON.stringify(this.data);

    // this.subscription1 = timer(0,300).pipe(
    //   switchMap(()=>this.clearPhoneNumber())
    // ).subscribe(
    //   (result:any)=>{
    //     console.log(" result of Phone no is",result)
    //     this.phone = result['phone'];
        
    //   }
    // );
    // this.dataService.getData(this.dataString).subscribe(
    //   (res)=>{
    //      console.log('Data saved suceessfully:',res);
  
    //   },
    //  (error) => {
    //   console.error('Error saving data:', error);
    //  }
    //  );
    

    
  }

  

  

    

 
  ngOnInit() {  
    // console.log("data is",this.data);
    //   console.log("Directing to Home win")
      
    };
    ngOnDestroy(){
    
    }

  }
 

