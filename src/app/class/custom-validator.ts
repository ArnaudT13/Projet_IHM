import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidator {

    /**
     * Check if the password and confirmPassword are the same
     * @param group The formGroup
     * @returns
     */
    static checkPasswords(group: FormGroup) {
        const password = group.get('password').value;
        const confirmPassword = group.get('confirmPassword').value;

        return password === confirmPassword ? null : { notSame: true }     
    }
}
