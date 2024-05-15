import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { SharedService } from './../../services/shared.service';
import { CartService } from './../../../cart/services/cart.service';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{
  @Input() product:any;
  favorite:boolean=false;
  constructor(private sharedService :SharedService,private cartService:CartService){}
  ngOnInit(): void {
    let favoriteList=localStorage.getItem(environment.favorites);
    this.favorite = favoriteList?.includes(this.product.id)?true:false;
  }
  addToCart(){
    let quantity=1
    this.cartService.addProductToCart(this.product,quantity);
  }
  addToFavorites(){
    this.sharedService.addToFavorites(this.product.id);
  }
  removeFromFavorites(){
    let favoritesData = localStorage.getItem(environment.favorites);
    if(favoritesData){ 
      let favoriteList=[];
      favoriteList = JSON.parse(favoritesData);
      let newFavoriteList = favoriteList.filter((id:any)=>id !== this.product.id);  
      localStorage.setItem(environment.favorites,JSON.stringify(newFavoriteList));
      console.log('removed')
      return;
    }
    console.log('Does not exist')
  }
}
