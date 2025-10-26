import { inject } from '@angular/core';
import { MockProductService } from '@core/index';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { ProductsActions } from '../actions/products.actions';

export const loadProductsEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(MockProductService)) => {
    return actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap(() =>
        productService.getAllProducts().pipe(
          map((products) => ProductsActions.loadProductsSuccess({ products })),
          catchError((error: Error) =>
            of(ProductsActions.loadProductsFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const createProductEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(MockProductService)) => {
    return actions$.pipe(
      ofType(ProductsActions.createProduct),
      exhaustMap(({ product }) =>
        productService.createProduct(product).pipe(
          map((createdProduct) =>
            ProductsActions.createProductSuccess({ product: createdProduct })
          ),
          catchError((error: Error) =>
            of(ProductsActions.createProductFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const updateProductEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(MockProductService)) => {
    return actions$.pipe(
      ofType(ProductsActions.updateProduct),
      exhaustMap(({ id, product }) =>
        productService.updateProduct(id, product).pipe(
          map((updatedProduct) =>
            ProductsActions.updateProductSuccess({ product: updatedProduct })
          ),
          catchError((error: Error) =>
            of(ProductsActions.updateProductFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const deleteProductEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(MockProductService)) => {
    return actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      exhaustMap(({ id }) =>
        productService.deleteProduct(id).pipe(
          map(() => ProductsActions.deleteProductSuccess({ id })),
          catchError((error: Error) =>
            of(ProductsActions.deleteProductFailure({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);
