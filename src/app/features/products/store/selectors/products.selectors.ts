import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from '../reducers/products.reducer';

export const PRODUCTS_FEATURE_KEY = 'products';

export const selectProductsState = createFeatureSelector<ProductsState>(PRODUCTS_FEATURE_KEY);

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => state.products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state: ProductsState) => state.loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductsState) => state.error
);

export const selectSelectedProduct = createSelector(
  selectProductsState,
  (state: ProductsState) => state.selectedProduct
);

export const selectProductById = (id: number) =>
  createSelector(selectAllProducts, (products) => products.find((product) => product.id === id));
