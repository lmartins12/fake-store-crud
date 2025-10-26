import { Injectable, inject } from '@angular/core';
import { IProduct, MockProductService } from '@core/index';
import { MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';
import { PRODUCTS_LIST_CONSTANTS } from '../constants/products-list.constants';

@Injectable()
export class ProductsFacadeService {
  private readonly productService = inject(MockProductService);
  private readonly messageService = inject(MessageService);

  private readonly constants = PRODUCTS_LIST_CONSTANTS;

  public loadProducts(): Observable<IProduct[]> {
    return this.productService.getAllProducts();
  }

  public createProduct(productData: Omit<IProduct, 'id'>): Observable<IProduct> {
    return this.productService.createProduct(productData).pipe(
      tap(() => {
        this.messageService.add(this.constants.CREATE_PRODUCT_SUCCESS_MESSAGE);
      })
    );
  }

  public updateProduct(id: number, productData: IProduct): Observable<IProduct> {
    return this.productService.updateProduct(id, productData).pipe(
      tap(() => {
        this.messageService.add(this.constants.UPDATE_PRODUCT_SUCCESS_MESSAGE);
      })
    );
  }

  public deleteProduct(id: number): Observable<void> {
    return this.productService.deleteProduct(id).pipe(
      tap(() => {
        this.messageService.add(this.constants.DELETE_PRODUCT_SUCCESS_MESSAGE);
      })
    );
  }

  public showError(operation: string): void {
    this.messageService.add(this.constants.SHOW_ERROR_MESSAGE(operation));
  }
}
