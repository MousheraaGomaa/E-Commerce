import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.css']
})
export class FilterSidebarComponent implements OnInit,OnDestroy {
  price:any = {'minPrice':null,'maxPrice':null};
  checkboxCategory:any[]=[];
  checkboxAvailable:any[]=[];
  private subscriptions:Subscription[]=[];
  params:any = {};      
  constructor(
    private filterService:FilterService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ){}
  // Done
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
//  implemented 
  onchange() {

    this.filterService.setCheckboxAvailable(this.checkboxAvailable);
    this.filterService.setCheckboxCategory(this.checkboxCategory);
    this.filterService.setPrice(this.price);

    let params = this.filterService.getParams();
    this.navigateToSamePage(params);
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
