import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData : any = {products:[],totalPrice:0};
  tax=0;
  constructor(private router:Router,private cartService : CartService){}
  ngOnInit(): void {
    this.cartService.cartDataubj.subscribe((cartData)=>{
      this.cartData = cartData;
    })
  }
  removeFromCart(id:number):void{
    this.cartService.removeProductFromCart(id);
  }
  increment(index:number):void{
    let quantity = this.cartData.products[index].qty+1;
    this.cartService.updateCart(index,quantity);
  }
  decrement(index:number):void{
    if(this.cartData.products[index].qty>1)
    {
      let quantity = this.cartData.products[index].qty-1;
      this.cartService.updateCart(index,quantity);
    }
  }
  getCount():number{
    let count=0;
    this.cartData.products.map((product:any)=>{
      count+=product.qty;
    });
    return count;
  }
  clear(){
    this.cartService.clearCart();
  }
  checkout(){
    this.router.navigateByUrl('/payment');
    // ,{state:this.cartData}
  }
  navigateToShop(){
    this.router.navigate(['/products']);
  }
}
