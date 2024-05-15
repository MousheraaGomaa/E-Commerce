import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from './../../../cart/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  cartData : any;
  @Output('toggleEvent') toggleEvent= new EventEmitter();
  constructor( cartService: CartService){
    cartService.cartDataubj.subscribe((cartData)=>{
      this.cartData = cartData;
    });
  }
  //fire toggle event
  sidenavToggle(){
    this.toggleEvent.emit();
  }

}
