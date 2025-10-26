import { IProduct } from '@core/index';
import { ProductsActions } from '../actions/products.actions';
import { initialProductsState, productsReducer, ProductsState } from './products.reducer';

describe('ProductsReducer', () => {
  const mockProduct: IProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test Description',
    category: 'test',
    image: 'test.jpg',
  };

  const mockProducts: IProduct[] = [mockProduct, { ...mockProduct, id: 2, title: 'Product 2' }];

  describe('Estado Inicial', () => {
    it('deve retornar o estado inicial', () => {
      const action = { type: 'Unknown' };
      const state = productsReducer(initialProductsState, action);

      expect(state).toBe(initialProductsState);
    });
  });

  describe('Load Products', () => {
    it('deve definir loading como true ao carregar produtos', () => {
      const action = ProductsActions.loadProducts();
      const state = productsReducer(initialProductsState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('deve atualizar produtos em caso de sucesso', () => {
      const action = ProductsActions.loadProductsSuccess({ products: mockProducts });
      const state = productsReducer(initialProductsState, action);

      expect(state.products).toEqual(mockProducts);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('deve definir erro em caso de falha', () => {
      const error = 'Erro ao carregar produtos';
      const action = ProductsActions.loadProductsFailure({ error });
      const state = productsReducer(initialProductsState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
    });
  });

  describe('Create Product', () => {
    it('deve definir loading como true ao criar produto', () => {
      const action = ProductsActions.createProduct({ product: mockProduct });
      const state = productsReducer(initialProductsState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('deve adicionar produto em caso de sucesso', () => {
      const action = ProductsActions.createProductSuccess({ product: mockProduct });
      const state = productsReducer(initialProductsState, action);

      expect(state.products).toContain(mockProduct);
      expect(state.products.length).toBe(1);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('deve definir erro em caso de falha', () => {
      const error = 'Erro ao criar produto';
      const action = ProductsActions.createProductFailure({ error });
      const state = productsReducer(initialProductsState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
    });
  });

  describe('Update Product', () => {
    const initialStateWithProducts: ProductsState = {
      ...initialProductsState,
      products: mockProducts,
    };

    it('deve definir loading como true ao atualizar produto', () => {
      const action = ProductsActions.updateProduct({ id: 1, product: mockProduct });
      const state = productsReducer(initialStateWithProducts, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('deve atualizar produto em caso de sucesso', () => {
      const updatedProduct = { ...mockProduct, title: 'Updated Product' };
      const action = ProductsActions.updateProductSuccess({ product: updatedProduct });
      const state = productsReducer(initialStateWithProducts, action);

      const updated = state.products.find((p) => p.id === 1);
      expect(updated?.title).toBe('Updated Product');
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('deve definir erro em caso de falha', () => {
      const error = 'Erro ao atualizar produto';
      const action = ProductsActions.updateProductFailure({ error });
      const state = productsReducer(initialStateWithProducts, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
    });
  });

  describe('Delete Product', () => {
    const initialStateWithProducts: ProductsState = {
      ...initialProductsState,
      products: mockProducts,
    };

    it('deve definir loading como true ao deletar produto', () => {
      const action = ProductsActions.deleteProduct({ id: 1 });
      const state = productsReducer(initialStateWithProducts, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('deve remover produto em caso de sucesso', () => {
      const action = ProductsActions.deleteProductSuccess({ id: 1 });
      const state = productsReducer(initialStateWithProducts, action);

      expect(state.products.length).toBe(1);
      expect(state.products.find((p) => p.id === 1)).toBeUndefined();
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('deve definir erro em caso de falha', () => {
      const error = 'Erro ao deletar produto';
      const action = ProductsActions.deleteProductFailure({ error });
      const state = productsReducer(initialStateWithProducts, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
    });
  });

  describe('UI Actions', () => {
    it('deve definir produto selecionado', () => {
      const action = ProductsActions.setSelectedProduct({ product: mockProduct });
      const state = productsReducer(initialProductsState, action);

      expect(state.selectedProduct).toEqual(mockProduct);
    });

    it('deve limpar produto selecionado', () => {
      const initialStateWithSelected: ProductsState = {
        ...initialProductsState,
        selectedProduct: mockProduct,
      };
      const action = ProductsActions.clearSelectedProduct();
      const state = productsReducer(initialStateWithSelected, action);

      expect(state.selectedProduct).toBeNull();
    });

    it('deve limpar erro', () => {
      const initialStateWithError: ProductsState = {
        ...initialProductsState,
        error: 'Algum erro',
      };
      const action = ProductsActions.clearError();
      const state = productsReducer(initialStateWithError, action);

      expect(state.error).toBeNull();
    });
  });
});
