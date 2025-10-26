import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { BaseProductListComponent } from '../base/base-product-list';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule, DataViewModule, ButtonModule, TooltipModule, SkeletonModule],
  templateUrl: './product-catalog.component.html',
  styleUrl: './product-catalog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCatalogComponent extends BaseProductListComponent {}
