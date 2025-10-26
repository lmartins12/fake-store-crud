import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import {
  createProductEffect,
  deleteProductEffect,
  loadProductsEffect,
  updateProductEffect,
} from './effects/products.effects';
import { productsReducer } from './reducers/products.reducer';
import { PRODUCTS_FEATURE_KEY } from './selectors/products.selectors';

export * from './actions/products.actions';
export * from './effects/products.effects';
export * from './reducers/products.reducer';
export * from './selectors/products.selectors';

export function provideProductsStore() {
  return provideState(PRODUCTS_FEATURE_KEY, productsReducer);
}

export function provideProductsEffects() {
  return provideEffects({
    loadProductsEffect,
    createProductEffect,
    updateProductEffect,
    deleteProductEffect,
  });
}
