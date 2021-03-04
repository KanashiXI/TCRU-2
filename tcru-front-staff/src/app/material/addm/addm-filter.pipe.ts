import { Material } from './../../models/Material.model';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name:'addmFilter'
})
export class AddmFilterPipe implements PipeTransform {
    transform(Material:Material[],Search: string): Material[]{
        if(!Material || !Search){
            return Material
        }
        return Material.filter(Material=>
            Material.material_name.toLowerCase().indexOf(Search.toLowerCase())!==-1);

    }
}
