import { Injectable, inject } from '@angular/core';
import { IProduct } from '@core/index';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { PRODUCTS_LIST_CONSTANTS } from '../constants/products-list.constants';
import {
  ProductsActions,
  selectAllProducts,
  selectProductsError,
  selectProductsLoading,
  selectSelectedProduct,
} from '../store';

@Injectable()
export class ProductsFacadeService {
  private readonly store = inject(Store);
  private readonly messageService = inject(MessageService);

  private readonly constants = PRODUCTS_LIST_CONSTANTS;

  public readonly products$ = this.store.selectSignal(selectAllProducts);
  public readonly loading$ = this.store.selectSignal(selectProductsLoading);
  public readonly error$ = this.store.selectSignal(selectProductsError);
  public readonly selectedProduct$ = this.store.selectSignal(selectSelectedProduct);

  public loadProducts(): void {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  public createProduct(productData: Omit<IProduct, 'id'>): void {
    this.store.dispatch(ProductsActions.createProduct({ product: productData }));
    this.messageService.add(this.constants.CREATE_PRODUCT_SUCCESS_MESSAGE);
  }

  public updateProduct(id: number, productData: IProduct): void {
    this.store.dispatch(ProductsActions.updateProduct({ id, product: productData }));
    this.messageService.add(this.constants.UPDATE_PRODUCT_SUCCESS_MESSAGE);
  }

  public deleteProduct(id: number): void {
    this.store.dispatch(ProductsActions.deleteProduct({ id }));
    this.messageService.add(this.constants.DELETE_PRODUCT_SUCCESS_MESSAGE);
  }

  public setSelectedProduct(product: IProduct | null): void {
    this.store.dispatch(ProductsActions.setSelectedProduct({ product }));
  }

  public clearSelectedProduct(): void {
    this.store.dispatch(ProductsActions.clearSelectedProduct());
  }

  public clearError(): void {
    this.store.dispatch(ProductsActions.clearError());
  }

  public showError(operation: string): void {
    this.messageService.add(this.constants.SHOW_ERROR_MESSAGE(operation));
  }
}
