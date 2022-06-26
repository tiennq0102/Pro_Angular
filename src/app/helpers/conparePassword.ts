import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export function comparePasswordValidator(otherValue : string=""):ValidatorFn{
    return (control : AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        console.log(value, otherValue);
        return value !== otherValue ? {matchConfirmPassword: true} : null;
    }
}