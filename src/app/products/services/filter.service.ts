import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn:'root'})
export class FilterService {

  private price = new BehaviorSubject<any>({'minPrice':null,'maxPrice':null});
  private checkboxCategory = new BehaviorSubject<any[]>([]);
  private checkboxAvailable = new BehaviorSubject<any[]>([
    {label:"In Stock",checked:false},
    {label:"Out Of Stock",checked:false}
  ]);
  constructor() { }
  getCheckboxCategory(){
    return this.checkboxCategory;
  }
  getCheckboxAvailable(){
    return this.checkboxAvailable;
  }
  getPrice(){
    return this.price;
  }
  setCheckboxCategory(state:any[]){
    this.checkboxCategory.next(state);
  }
  setCheckboxAvailable(state:any[]){
    this.checkboxAvailable.next(state);
  }
  setPrice(state:any){
    this.price.next(state);
  }
  clear(){
    let availableState = this.checkboxAvailable.value
    .map((checkbox)=>{
      checkbox.checked=false;
      return checkbox;
    });

    let categoryState =  this.checkboxCategory.value
    .map((checkbox)=>{
      checkbox.checked=false;
      return checkbox;
    });

    this.checkboxAvailable.next(availableState);
    this.checkboxCategory.next(categoryState);
    this.price.next({'minPrice':null,'maxPrice':null});
  }
  setCategoryInitialState(categories:any[]){
    let state = [];
    for(let category of categories){
      let checkbox = {label:category,checked:false}
      state.push(checkbox);
    }
    this.checkboxCategory.next(state);
  }
  getParams(){
     
    let params:any = {};
    let cate: number[] = [];
    let avail:number[] = [];

    this.checkboxCategory.value.map((checkbox,index)=>{
      if(checkbox.checked){
        cate.push(index+1);
      }
    });
    this.checkboxAvailable.value.map((checkbox,index)=>{
      if(checkbox.checked){
        avail.push(index+1);
      }
    });

    params = {
      category : cate,
      available:avail,
      minPrice: this.price.value['minPrice'],
      maxPrice:this.price.value['maxPrice']
    }
    return params;
  }
}
