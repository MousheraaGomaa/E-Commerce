import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() { }
  addToFavorites(id:number){
    let favoriteList=[];
    let favoritesData=localStorage.getItem(environment.favorites);
    if(favoritesData){
      favoriteList = JSON.parse(favoritesData);
      let exist = favoriteList.includes(id);
      if(exist){
        console.log('already exist');
        return;
      }
    }
    favoriteList.push(id);
    localStorage.setItem(environment.favorites,JSON.stringify(favoriteList));
    console.log('added')
  }
  addToCart(product:any,quantity:number){
    let data=[];
    let cartData = localStorage.getItem(environment.cart);
    if(cartData){
      data = JSON.parse(cartData);
      let exist = data.find((item:any)=>item.id==product.id);
      if(exist){
        console.log("already exist") //toast
        return ;
      }
    }
    data.push({...product,qty:quantity});
    localStorage.setItem(environment.cart,JSON.stringify(data));
    console.log("added a ");  //popup added
  }
}
