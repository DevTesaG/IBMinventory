import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import Validation from '../utils/validation';

@Directive({
  selector: '[appStringPattern]',
  providers: [{ provide: NG_VALIDATORS, useExisting: StringPatternDirective , multi: true }]
})
export class StringPatternDirective {

  @Input('appStringPattern') matchPattern: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {
    
    return Validation.match(this.matchPattern[0], this.matchPattern[1])(formGroup);
  }
  
}
