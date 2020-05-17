import { FormControl, FormGroup } from '@angular/forms';

export class FormValidations {

  static cepValidator(control: FormControl) {
    const cep = control.value;
    if (cep && cep !== '') {
        const validacep = /^[0-9]{8}$/;
        return validacep.test(cep) ? null : {cepInvalido: true};
    }
    return null;
  }

  static equalsTo(otherfield: string) {
    const validator = (formControl: FormControl) => {

      if (otherfield == null) {
        throw new Error('É necessário informar um campo.');
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = (<FormGroup>formControl.root).get(otherfield);

      if (!field) {
         throw new Error('É necessário informar um campo válido.');
      }

      if (field.value !== formControl.value) {
         return { equalsTo: otherfield};
      }

      return null;
    };
      return validator;
  }
    static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
      const config = {
        'required': `${fieldName} é obrigatório`,
        'email': `${fieldName} é inválido`,
        'equalsTo': `${fieldName} está diferente de ${validatorValue}`,
        'emailInvalido': `${fieldName} está diferente de ${validatorValue}`,
        'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres`,
        'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres`,
        'cepInvalido': `CEP inválido`
      };
      return config[validatorName];
    }
}
