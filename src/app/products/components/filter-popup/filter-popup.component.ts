import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterService } from './../../services/filter.service';
@Component({
  selector: 'app-filter-popup',
  templateUrl: './filter-popup.component.html',
  styleUrls: ['./filter-popup.component.css']
})
export class FilterPopupComponent implements OnInit,OnDestroy{
  params:any={};
  price:any = {'minPrice':null,'maxPrice':null};
  checkboxCategory:any[]=[];
  checkboxAvailable:any[]=[];
  private subscriptions:Subscription[]=[];
  constructor(
    private mydialogRef:MatDialogRef<FilterPopupComponent>,
    private filterService:FilterService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ){}
   
  ngOnInit(): void {

    let availableSub = this.filterService.getCheckboxAvailable().subscribe((data)=>{
          this.checkboxAvailable = data.map(obj => ({ ...obj }));
        });
    let categorySub = this.filterService.getCheckboxCategory().subscribe((data)=>{
          this.checkboxCategory = data.map(obj => ({ ...obj }));     
        });
    let priceSub = this.filterService.getPrice().subscribe((data)=>{
      this.price = {...data};
    });
    this.subscriptions.push(availableSub);
    this.subscriptions.push(categorySub);
    this.subscriptions.push(priceSub);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription)=>{
      subscription.unsubscribe();
    });
  }
  close(){
    this.mydialogRef.close();
  }
  apply(){

    this.filterService.setCheckboxAvailable(this.checkboxAvailable);
    this.filterService.setCheckboxCategory(this.checkboxCategory);
    this.filterService.setPrice(this.price);

    this.params = this.filterService.getParams();
    this.navigateToSamePage(this.params)

    this.mydialogRef.close();
  }
  clear(){
    this.checkboxAvailable = this.checkboxAvailable.map((checkbox) =>{
      checkbox.checked = false;
      return checkbox;
    });
    this.checkboxCategory = this.checkboxCategory.map((checkbox) =>{
      checkbox.checked= false;
      return checkbox;
    });
    this.price = {'minPrice':null,'maxPrice':null};
  }
  
  navigateToSamePage(params:any):void{
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: params,
      });
  }

}
