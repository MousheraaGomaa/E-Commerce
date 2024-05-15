import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
//  ------app components modules----------
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
//----------data module------------
import { HttpClientModule } from '@angular/common/http';
//---------services----------------
import { ProductsService } from './products/services/products.service'; 
//----------sidenav-------
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ProductsModule,
    CartModule,
    HomeModule,
    PaymentModule,
//-------material modules--------
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    BrowserAnimationsModule,
//----------routing-------------------
    RouterOutlet,
//-------Data----------------------
    HttpClientModule  ,
// notification
    NzNotificationModule
    ],
  providers: [
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
