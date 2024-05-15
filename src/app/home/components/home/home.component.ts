import { Component } from '@angular/core';
import { ProductsService } from './../../../products/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products:any[]=[];
  constructor(private myservice:ProductsService){}
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.myservice.getAllProducts().subscribe({
      next:(data:any)=>{
        console.log(data)
        this.products=data.products.slice(0,15);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
