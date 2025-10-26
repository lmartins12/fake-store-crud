import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IProduct } from '@core/index';
import { HeaderComponent } from '@shared/index';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ProductCatalogComponent } from './components/product-catalog/product-catalog.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { PRODUCTS_LIST_CONSTANTS } from './constants/products-list.constants';
import { ProductsFacadeService } from './services/products-facade.service';

type ViewMode = 'table' | 'catalog';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ProductTableComponent,
    ProductCatalogComponent,
    ProductFormComponent,
    ProductDetailsComponent,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    ButtonModule,
    TooltipModule,
  ],
  providers: [ProductsFacadeService],
  templateUrl: './products-list.page.html',
  styleUrl: './products-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListPage implements OnInit {
  private readonly facade = inject(ProductsFacadeService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly destroyRef = inject(DestroyRef);

  public readonly products = signal<IProduct[]>([]);
  public readonly loading = signal<boolean>(false);
  public readonly showFormDialog = signal<boolean>(false);
  public readonly showDetailsDialog = signal<boolean>(false);
  public readonly selectedProduct = signal<IProduct | null>(null);
  public readonly viewMode = signal<ViewMode>('table');

  public ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts(): void {
    this.loading.set(true);
    this.facade
      .loadProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (products) => {
          this.products.set(products);
          this.loading.set(false);
        },
        error: () => {
          this.facade.showError('load');
          this.loading.set(false);
        },
      });
  }

  public openCreateDialog(): void {
    this.showFormDialog.set(false);
    this.showDetailsDialog.set(false);
    this.selectedProduct.set(null);

    queueMicrotask(() => {
      this.showFormDialog.set(true);
    });
  }

  public openEditDialog(product: IProduct): void {
    this.showFormDialog.set(false);
    this.showDetailsDialog.set(false);

    queueMicrotask(() => {
      this.selectedProduct.set(product);
      this.showFormDialog.set(true);
    });
  }

  public openDetailsDialog(product: IProduct): void {
    this.showFormDialog.set(false);
    this.showDetailsDialog.set(false);

    queueMicrotask(() => {
      this.selectedProduct.set(product);
      this.showDetailsDialog.set(true);
    });
  }

  public closeDialogs(): void {
    this.showFormDialog.set(false);
    this.showDetailsDialog.set(false);
    this.selectedProduct.set(null);
  }

  public setViewMode(mode: ViewMode): void {
    this.viewMode.set(mode);
  }

  public toggleViewMode(): void {
    this.viewMode.set(this.viewMode() === 'table' ? 'catalog' : 'table');
  }

  public handleSave(productData: Partial<IProduct>): void {
    const selectedProduct = this.selectedProduct();

    this.loading.set(true);
    this.closeDialogs();

    const operation$ =
      selectedProduct && productData.id
        ? this.facade.updateProduct(productData.id, productData as IProduct)
        : this.facade.createProduct(productData as Omit<IProduct, 'id'>);

    operation$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: () => {
        this.facade.showError(selectedProduct ? 'update' : 'create');
        this.loading.set(false);
      },
    });
  }

  public handleDelete(product: IProduct): void {
    this.confirmationService.confirm({
      ...PRODUCTS_LIST_CONSTANTS.MODAL_CONFIRMATION,
      accept: () => {
        this.loading.set(true);
        this.facade
          .deleteProduct(product.id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.loadProducts();
            },
            error: () => {
              this.facade.showError('delete');
              this.loading.set(false);
            },
          });
      },
    });
  }
}
