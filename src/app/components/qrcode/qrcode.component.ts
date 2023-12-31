import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { PhoneService } from 'src/app/shared/services/phone.service';

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

  constructor(
    private router: Router,
    private dataService: DataService, 
    private phoneService: PhoneService, 
  ) { 
      this.data['phone'] = this.dataService.getPhoneNumber();
      this.data['bottles'] = this.dataService.getBottles();
      this.dataString = JSON.stringify(this.data);


      setTimeout(()=>{
        this.router.navigateByUrl('thank');
        this.dataService.clearUserData();
        this.phoneService.clearPhoneNumber();
        
      }, 10000);
  }

  ngOnInit() {

  }

}
