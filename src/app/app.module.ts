import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BottleComponent } from './components/bottle/bottle.component';
import { PhoneComponent } from './components/phone/phone.component';
import { QrcodeComponent } from './components/qrcode/qrcode.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { ToastrModule } from 'ngx-toastr';
import { QRCodeModule } from 'angularx-qrcode';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { BinfulComponent } from './components/binful/binful.component';
import { PasswordComponent } from './components/password/password.component';
import { AdminComponent } from './components/admin/admin.component';



@NgModule({
  declarations: [
    AppComponent,
    BottleComponent,
    PhoneComponent,
    QrcodeComponent,
    ThankYouComponent,
    HomeComponent,
    BinfulComponent,
    PasswordComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    QRCodeModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
