import { IProduct } from '@core/index';
import { createReducer, on } from '@ngrx/store';
import { ProductsActions } from '../actions/products.actions';

export interface ProductsState {
  products: IProduct[];
  selectedProduct: IProduct | null;
  loading: boolean;
  error: string | null;
}

export const initialProductsState: ProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

export const productsReducer = createReducer(
  initialProductsState,

  // Load Products
  on(
    ProductsActions.loadProducts,
    (state): ProductsState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    ProductsActions.loadProductsSuccess,
    (state, { products }): ProductsState => ({
      ...state,
      products,
      loading: false,
      error: null,
    })
  ),
  on(
    ProductsActions.loadProductsFailure,
    (state, { error }): ProductsState => ({
      ...state,
      loading: false,
      error,
    })
  ),

  // Create Product
  on(
    ProductsActions.createProduct,
    (state): ProductsState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    ProductsActions.createProductSuccess,
    (state, { product }): ProductsState => ({
      ...state,
      products: [...state.products, product],
      loading: false,
      error: null,
    })
  ),
  on(
    ProductsActions.createProductFailure,
    (state, { error }): ProductsState => ({
      ...state,
      loading: false,
      error,
    })
  ),

  // Update Product
  on(
    ProductsActions.updateProduct,
    (state): ProductsState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    ProductsActions.updateProductSuccess,
    (state, { product }): ProductsState => ({
      ...state,
      products: state.products.map((p) => (p.id === product.id ? product : p)),
      loading: false,
      error: null,
    })
  ),
  on(
    ProductsActions.updateProductFailure,
    (state, { error }): ProductsState => ({
      ...state,
      loading: false,
      error,
    })
  ),

  // Delete Product
  on(
    ProductsActions.deleteProduct,
    (state): ProductsState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    ProductsActions.deleteProductSuccess,
    (state, { id }): ProductsState => ({
      ...state,
      products: state.products.filter((p) => p.id !== id),
      loading: false,
      error: null,
    })
  ),
  on(
    ProductsActions.deleteProductFailure,
    (state, { error }): ProductsState => ({
      ...state,
      loading: false,
      error,
    })
  ),

  // UI Actions
  on(
    ProductsActions.setSelectedProduct,
    (state, { product }): ProductsState => ({
      ...state,
      selectedProduct: product,
    })
  ),
  on(
    ProductsActions.clearSelectedProduct,
    (state): ProductsState => ({
      ...state,
      selectedProduct: null,
    })
  ),
  on(
    ProductsActions.clearError,
    (state): ProductsState => ({
      ...state,
      error: null,
    })
  )
);
