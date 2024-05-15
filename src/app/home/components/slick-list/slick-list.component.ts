import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../../products/services/products.service';
@Component({
  selector: 'app-slick-list',
  templateUrl: './slick-list.component.html',
  styleUrls: ['./slick-list.component.css']
})

export class SlickListComponent implements OnInit {
  slideConfig:any;
  slides:any;
  slidesImages:any;
  constructor(private myservice:ProductsService){}
  ngOnInit(): void {
    this.slideConfig = {
      "slidesToShow": 3,
      "slidesToScroll": 3,
      "infinite": true,
      "arrows":true,
      prevArrow:'<span class="fa fa-angle-left  prev"></span>',
      nextArrow:'<span class="fa fa-angle-right next"></span>',
      "responsive":[
         {
           "breakpoint":991,
           "settings":{
             "slidesToShow": 2,
             "slidesToScroll": 2,
           }
         },
         {
           "breakpoint":767,
           "settings":{
             "slidesToShow": 1,
             "slidesToScroll": 1,
           }
         }
      ]
    };
    this.slidesImages=[
      "assets/images/categories/smartphones.jpg",
      "assets/images/categories/laptops.webp",
      "assets/images/categories/fragrances.jpg" ,
      "assets/images/categories/skincare.webp" ,
      "assets/images/categories/groceries.png",
      "assets/images/categories/home-decoration.jpg",
      "assets/images/categories/furniture.webp",
      "assets/images/categories/tops-products.png",
      "assets/images/categories/womens-dresses.jpg",
      "assets/images/categories/womens-shoes.jpg" ,
      "assets/images/categories/mens-shirts.jpg" ,
      "assets/images/categories/mens-shoes.webp",
      "assets/images/categories/mens-watches.webp" ,
      "assets/images/categories/womens-watches.jpg",
      "assets/images/categories/womens-bags.webp",
      "assets/images/categories/womens-jewellery.jpg",
      "assets/images/categories/sunglasses.jpg",
      "assets/images/categories/automotive.jpg",
      "assets/images/categories/motorcycle.jpg",
      "assets/images/categories/lighting.jpg"
    ]
   
    this.getCategories();
  }
  getCategories(){
    this.myservice.getAllCategories().subscribe({
      next:(data:any)=>{
        this.slides = data;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}
 