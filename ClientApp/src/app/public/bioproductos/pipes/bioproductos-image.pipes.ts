import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/Interfaces/Product';

@Pipe({
  name: 'productImage'
})

export class BioProductImagePipe implements PipeTransform{
  transform( product: Product): string {
    if( !product.product_ID){
      return 'assets/no-image.png';
    }
    return 'assets/no-image.png'
  }

}
