import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { BaseProductListComponent } from '../base/base-product-list';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TooltipModule, SkeletonModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTableComponent extends BaseProductListComponent {}
