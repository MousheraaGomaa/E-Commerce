import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAvailability'
})
export class FilterAvailabilityPipe implements PipeTransform {

  transform(products:any[],selectedAvailable:any[]): any[] {

    if(!selectedAvailable||!selectedAvailable.length){
      return products;
    }
    else
    {
      let filteredProducts;
      filteredProducts= products.filter((product:any)=>{
        return selectedAvailable?.some((availNum)=>{
          if(availNum=='1'){
            return product.stock > 0
          }
          else{
            return product.stock == 0 
          }
        });
      });
      return filteredProducts;
    }
  }
}
