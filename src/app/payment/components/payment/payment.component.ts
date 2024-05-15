import { Component, OnInit } from '@angular/core';
import { CartService } from './../../../cart/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  paymentMethod:any;
  tax:number;
  shipping:number;
  cartData:any;
  constructor( private cartService : CartService ){
    this.tax = 0.0;
    this.shipping = 0.01;
    this.cartData = {products:[],totalPrice:0};
  }
  ngOnInit(): void {
    this.cartService.cartDataubj.subscribe((cartData)=>{
      this.cartData = cartData;
    });
  }
  click(payment:string){
    this.paymentMethod=payment;
  }
  decrement(index:number){
    if( this.cartData.products[index].qty > 1){
      let quantity = this.cartData.products[index].qty - 1;
      this.cartService.updateCart(index,quantity);
    }
  }
  increment(index:number){
    let quantity = this.cartData.products[index].qty + 1;
    this.cartService.updateCart(index,quantity);
  }
  remove(id:number){
    this.cartService.removeProductFromCart(id);
  }
  getTotalPrice(){
    let total= this.tax + this.shipping + this.cartData.totalPrice;
    return total;
  }
  pay(){
    console.log('col')
  }
}
