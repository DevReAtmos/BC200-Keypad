import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BottleComponent } from './components/bottle/bottle.component';
import { PhoneComponent } from './components/phone/phone.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { QrcodeComponent } from './components/qrcode/qrcode.component';
import { HomeComponent } from './components/home/home.component';
import { BinfulComponent } from './components/binful/binful.component';
import { AdminComponent } from './components/admin/admin.component';
import { PasswordComponent } from './components/password/password.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'bottle',
    component: BottleComponent
  },
  {
    path: 'phone',
    component: PhoneComponent
  },
  {
    path: 'thank',
    component: ThankYouComponent
  },
  {
    path: 'qrcode',
    component: QrcodeComponent
  },
  {
    path: 'binful',
    component: BinfulComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'password',
    component: PasswordComponent,
    children:[
  {
    path:'admin',component:AdminComponent
  }
   
    ]
    
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
