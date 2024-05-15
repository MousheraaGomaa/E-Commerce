import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { environment } from 'src/environments/environment.development';
import { Product } from './../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartData:{products:any[],totalPrice:number};
  cartDataubj:BehaviorSubject<object>;

  constructor(private  notification:NzNotificationService) {

    let localCartData=localStorage.getItem(environment.cart);
    this.cartData = localCartData? JSON.parse(localCartData) : {products:[],totalPrice:0};
    this.cartDataubj= new BehaviorSubject<object>(this.cartData)
  }
  addProductToCart(product:Product,quantity:number){
    if(this.cartData.products.length){
      let exist = this. existInCart(product.id);
      console.log(exist)
      if(exist){
        this.notification.error( 
          'Added Product to Cart',
          `${product.title} already exists`
        );
        return ;
      }
    }
    this.cartData.products.push({...product,qty:quantity});
    this.cartData.totalPrice = this.getTotalPrice();
    localStorage.setItem(environment.cart,JSON.stringify(this.cartData));
    this.cartDataubj.next(this.cartData);
    this.notification.success( 
      'Added Product to Cart',
      `${product.title} was added to cart successfully !!!!`,
    );
  }
  removeProductFromCart(id:number):void{
    this.cartData.products = this.cartData.products.filter((product)=>product.id != id);
    this.cartData.totalPrice = this.getTotalPrice();
    localStorage.setItem(environment.cart,JSON.stringify(this.cartData));
    this.cartDataubj.next(this.cartData);
     this.notification.success( 
      'Remove Product from Cart',
      `The Product was removed from cart successfully !!!!`,
    );
  }
  updateCart(index:number,quantity:number):void{
    this.cartData.products[index].qty = quantity ;
    this.cartData.totalPrice = this.getTotalPrice();
    localStorage.setItem(environment.cart,JSON.stringify(this.cartData));
    this.cartDataubj.next(this.cartData);
  }
  getTotalPrice():number{
    let totalPrice=0;
    this.cartData.products.map((product)=>{
      totalPrice += product.qty*product.price;
    });
    return totalPrice;
  }
  clearCart():void{
    this.cartData ={products:[],totalPrice:0};
    localStorage.setItem(environment.cart,JSON.stringify(this.cartData));
    this.cartDataubj.next(this.cartData);
  }
  existInCart(id:number):boolean{
    let exist = this.cartData.products.find((item)=>item.id == id);
    console.log(exist)
    return exist;   //check output
  }
}

