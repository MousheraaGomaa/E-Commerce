import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCategory'
})
export class FilterCategoryPipe implements PipeTransform {

  transform(products:any[], categories:any[],selecteCategoriesIndex:any[]):any[]{
  
    if( selecteCategoriesIndex && selecteCategoriesIndex.length)
    {
      
      let filteredProducts=[];
      let selectedcatesName: any[] = [];

      selecteCategoriesIndex.map((cateNumber)=>{
        selectedcatesName.push(categories[Number(cateNumber)-1]);
      });

      filteredProducts = products.filter((product:any)=>{
        let category = product.category;  
        return selectedcatesName.includes(category);     
      });
      
      return filteredProducts;
    }
    else{
      return products
    }
  }

}
