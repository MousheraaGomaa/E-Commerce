import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterPopupComponent } from '../filter-popup/filter-popup.component';

import { ProductsService } from './../../services/products.service';
import { FilterService } from './../../services/filter.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
  // providers:[FilterService]
})
export class AllProductsComponent  implements OnInit{
  productsLoaded:boolean = false;
  products:any[]=[];
  categories:any[]=[];
  selectedSortField:string='none';
  selectedAvailable:any[] = [];
  selectedCategories:any[] = [];
  minPrice:any = null;
  maxPrice:any = null;
  sortFields = ['price','rating'];
  constructor(
    private service:ProductsService,
    private filterService:FilterService,
    private mydialog:MatDialog,
    private activatedRoute:ActivatedRoute,
    private router:Router){
  }
  ngOnInit(): void {
    this.getproducts();
    this.getallCategories();

    this.activatedRoute.queryParams.subscribe((params)=>{
      
      if(typeof params['category'] == 'string')
      {
        this.selectedCategories.push(params['category']); 
      }
      else{
        this.selectedCategories = params['category'];
      }
      if(typeof params['available'] == 'string')
      {
        this.selectedAvailable.push(params['available']);
      }
      else{
        this.selectedAvailable = params['available'];
      }
      
      this.minPrice = params['minPrice'];
      this.maxPrice = params['maxPrice'];
    })
  }
  getproducts(){
    this.service.getAllProducts().subscribe(
      {
        next:(data:any)=>{
          this.products=data.products;
          this.productsLoaded = true;
        },
        error:(err)=>{
          console.log(err)
        }
      }
    );
  }
  getallCategories(){
    this.service.getAllCategories().subscribe({
      next:(data:any)=>{
        this.categories = data;
        this.filterService.setCategoryInitialState(data)
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  // Done tested
  clear(){
    this.filterService.clear();
    this.selectedSortField='none';
    this.resetParams();
  }

  openDialog(){
    this.mydialog.open(FilterPopupComponent);
  }
  // Done tested
  changeSelected(e:any){
    this.selectedSortField = e.target.value;
  }
  resetParams(){
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: {},
      });
  }

}