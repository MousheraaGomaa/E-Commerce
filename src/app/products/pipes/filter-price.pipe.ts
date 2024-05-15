import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPrice'
})
export class FilterPricePipe implements PipeTransform {

  transform(products:any,min:any,max:any): any[] {
    let minPrice = Number(min);
    let maxPrice = Number(max);
    if(minPrice||maxPrice)
    {
      let filteredProducts = [];
      let min = minPrice||0;
      let max = maxPrice||Infinity;
      filteredProducts = products.filter((product:any)=>{
        return product.price >= min && product.price <= max;
      });
      return filteredProducts
    }
    else{
      return products;
    }
  }

}
