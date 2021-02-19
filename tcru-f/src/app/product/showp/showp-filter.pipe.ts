import { product } from '../../models/product.model';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name:'showpFilter'
})
export class ShowpFilterPipe implements PipeTransform {
    transform(product:product[],Search: string): product[]{
        if(!product || !Search){
            return product
        }
        return product.filter(product=>
            product.product_name.toLowerCase().indexOf(Search.toLowerCase())!==-1);

    }
}
