import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false //again doing this to rerender pipe output when the underlying object changes
})
export class SortPipe implements PipeTransform {

  transform(value: any, propName: string): any {
    return value.sort((a,b)=> {
      if(a[propName] > b[propName]){
        return 1;
      }else{
        return -1;
      }
    });
  }

}
