import { inject } from '@angular/core';
import { ProductService } from '@core/index';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { PRODUCTS_LIST_CONSTANTS } from '../../constants/products-list.constants';
import { ProductsActions } from '../actions/products.actions';

export const loadProductsEffect = createEffect(
  (
    actions$ = inject(Actions),
    productService = inject(ProductService),
    messageService = inject(MessageService)
  ) => {
    return actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap(() =>
        productService.getAllProducts().pipe(
          map((products) => ProductsActions.loadProductsSuccess({ products })),
          catchError((error: Error) => {
            messageService.add(PRODUCTS_LIST_CONSTANTS.LOAD_PRODUCTS_ERROR_MESSAGE);
            return of(ProductsActions.loadProductsFailure({ error: error.message }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const createProductEffect = createEffect(
  (
    actions$ = inject(Actions),
    productService = inject(ProductService),
    messageService = inject(MessageService)
  ) => {
    return actions$.pipe(
      ofType(ProductsActions.createProduct),
      exhaustMap(({ product }) =>
        productService.createProduct(product).pipe(
          map((createdProduct) => {
            messageService.add(PRODUCTS_LIST_CONSTANTS.CREATE_PRODUCT_SUCCESS_MESSAGE);
            return ProductsActions.createProductSuccess({ product: createdProduct });
          }),
          catchError((error: Error) => {
            messageService.add(PRODUCTS_LIST_CONSTANTS.CREATE_PRODUCT_ERROR_MESSAGE);
            return of(ProductsActions.createProductFailure({ error: error.message }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const updateProductEffect = createEffect(
  (
    actions$ = inject(Actions),
    productService = inject(ProductService),
    messageService = inject(MessageService)
  ) => {
    return actions$.pipe(
      ofType(ProductsActions.updateProduct),
      exhaustMap(({ id, product }) =>
        productService.updateProduct(id, product).pipe(
          map((updatedProduct) => {
            messageService.add(PRODUCTS_LIST_CONSTANTS.UPDATE_PRODUCT_SUCCESS_MESSAGE);
            return ProductsActions.updateProductSuccess({ product: updatedProduct });
          }),
          catchError((error: Error) => {
            messageService.add(PRODUCTS_LIST_CONSTANTS.UPDATE_PRODUCT_ERROR_MESSAGE);
            return of(ProductsActions.updateProductFailure({ error: error.message }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteProductEffect = createEffect(
  (
    actions$ = inject(Actions),
    productService = inject(ProductService),
    messageService = inject(MessageService)
  ) => {
    return actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      exhaustMap(({ id }) =>
        productService.deleteProduct(id).pipe(
          map(() => {
            messageService.add(PRODUCTS_LIST_CONSTANTS.DELETE_PRODUCT_SUCCESS_MESSAGE);
            return ProductsActions.deleteProductSuccess({ id });
          }),
          catchError((error: Error) => {
            messageService.add(PRODUCTS_LIST_CONSTANTS.DELETE_PRODUCT_ERROR_MESSAGE);
            return of(ProductsActions.deleteProductFailure({ error: error.message }));
          })
        )
      )
    );
  },
  { functional: true }
);
