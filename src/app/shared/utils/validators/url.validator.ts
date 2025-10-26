import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator para validar URLs
 * Aceita URLs com ou sem protocolo (http/https)
 *
 * @returns ValidatorFn que retorna null se válido ou { invalidUrl: true } se inválido
 *
 * @example
 * ```typescript
 * this.form = this.fb.group({
 *   website: ['', [Validators.required, urlValidator()]]
 * });
 * ```
 */
export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    const valid = urlPattern.test(control.value);

    return valid ? null : { invalidUrl: true };
  };
}
