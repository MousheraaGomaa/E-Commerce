import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], sortField: string): any[] {

    if(!value || !sortField ||sortField === 'none'){
      return value;
    }
    else{

      let products=[...value];

      products.sort((a:any,b:any)=>{
        let prop1;
        let prop2;

        prop1=a[sortField];
        prop2=b[sortField]

        if(prop1 > prop2)
        {
          return 1;
        }
        else if(prop1 < prop2){
          return -1
        }
        else{
          return 0;
        }
        
      });
      return products;
    }
  }

}
