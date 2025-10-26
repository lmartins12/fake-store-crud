import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { urlValidator } from '@shared/utils';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { IProduct } from '../../../../core';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    ButtonModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  public readonly product = input<IProduct | null>(null);

  public readonly saveProduct = output<Partial<IProduct>>();
  public readonly cancelEdit = output<void>();

  public form!: FormGroup;

  constructor() {
    effect(
      () => {
        const productValue = this.product();
        if (this.form) {
          if (productValue) {
            this.form.patchValue(productValue);
          } else {
            this.form.reset();
          }
        }
      },
      { allowSignalWrites: true }
    );
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      image: ['', [Validators.required, urlValidator()]],
    });

    const productValue = this.product();
    if (productValue) {
      this.form.patchValue(productValue);
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const productValue = this.product();

      const productToSave: Partial<IProduct> = productValue
        ? { ...formValue, id: productValue.id }
        : formValue;

      this.saveProduct.emit(productToSave);
      this.form.reset();
    }
  }

  public onCancel(): void {
    this.cancelEdit.emit();
    this.form.reset();
  }

  public getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);

    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return 'Este campo é obrigatório';
    }

    if (control.errors['minlength']) {
      const minLength = control.errors['minlength'].requiredLength;
      return `Mínimo de ${minLength} caracteres`;
    }

    if (control.errors['min']) {
      return 'O valor deve ser maior que zero';
    }

    if (control.errors['invalidUrl']) {
      return 'URL inválida';
    }

    return '';
  }

  public hasError(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }
}
