import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './components/payment/payment.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
    // NgbToastModule
  ]
})
export class PaymentModule { }
