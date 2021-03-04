import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeterialserviceService } from 'src/app/service/meterialservice.service';

export function uniquematerial_nameValidator(MeterialserviceService: MeterialserviceService): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return MeterialserviceService.getByname(c.value).pipe(
      map(material_name => {
        return material_name && material_name.length > 0 ? { 'uniquematerial_name': true } : null;
      })
    );
  }
}

@Directive({
  selector: '[uniquematerial_name]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: Uniquematerial_nameValidatorDirective, multi: true }]
})
export class Uniquematerial_nameValidatorDirective implements AsyncValidator {
  constructor(private MeterialserviceService: MeterialserviceService) { }
  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.MeterialserviceService.getByname(c.value).pipe(
      map(material_name => {
        return material_name && material_name.length > 0 ? { 'uniquematerial_name': true } : null;
      })
    );
  }

}
