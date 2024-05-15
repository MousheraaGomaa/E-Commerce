import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { CartService } from 'src/app/cart/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  product:any;
  relatedProducts:any[]=[]
  imageSrc:string='';
  quantity = 1;
  slideConfig = {
     "slidesToShow": 4,
     "slidesToScroll": 4,
     "arrows":false,
  };
  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private productService:ProductsService,
    private cartService:CartService,
  ){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id,category})=>{
      this.quantity = 1;
      this.getProduct(id);
      this.getRelatedProducts(category);
    });
   
  }
  
  getRelatedProducts(category:string){
    this.productService.getCategoryProducts(category).subscribe({
      next:(data:any)=>{
        this.relatedProducts = data.products;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  getProduct(id:number){
    this.productService.getProduct(id).subscribe({
      next:(data)=>{
        this.product = data;
        this.imageSrc=this.product.thumbnail;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  changeImage(imgSrc:string){
    this.imageSrc=imgSrc;
  }
  
  addToCart(){
    this.cartService.addProductToCart(this.product,this.quantity)
  }
  buyNow(){
    this.cartService.addProductToCart(this.product,this.quantity);
    this.router.navigateByUrl('payment');
  }
  getStarArray(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const starArray = Array(fullStars).fill(' fa-star ');
    
    if (hasHalfStar) {
      starArray.push(' fa-star-half-stroke ');
    }
    return starArray;
  }
  decrement(){
    if(this.quantity > 1){
      this.quantity--;
    } 
  }
  increment(){
    this.quantity++;
  }
}

