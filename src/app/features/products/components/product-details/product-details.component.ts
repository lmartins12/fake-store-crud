import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { IProduct } from '../../../../core';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TagModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent {
  public readonly product = input.required<IProduct>();
  public readonly closeDialog = output<void>();

  public onClose(): void {
    this.closeDialog.emit();
  }

  public onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    const fallbackElement = imgElement.nextElementSibling as HTMLElement;

    if (imgElement && fallbackElement) {
      imgElement.style.display = 'none';
      fallbackElement.style.display = 'flex';
    }
  }
}
