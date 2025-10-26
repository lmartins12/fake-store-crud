import { IProduct } from '@core/index';
import {
  selectAllProducts,
  selectProductById,
  selectProductsError,
  selectProductsLoading,
  selectSelectedProduct,
} from './products.selectors';
import { ProductsState } from '../reducers/products.reducer';

describe('ProductsSelectors', () => {
  const mockProduct: IProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test Description',
    category: 'test',
    image: 'test.jpg',
  };

  const mockProducts: IProduct[] = [
    mockProduct,
    { ...mockProduct, id: 2, title: 'Product 2' },
    { ...mockProduct, id: 3, title: 'Product 3' },
  ];

  const mockState: ProductsState = {
    products: mockProducts,
    selectedProduct: mockProduct,
    loading: false,
    error: null,
  };

  describe('selectAllProducts', () => {
    it('deve selecionar todos os produtos', () => {
      const result = selectAllProducts.projector(mockState);
      expect(result).toEqual(mockProducts);
    });

    it('deve retornar array vazio quando não houver produtos', () => {
      const emptyState: ProductsState = { ...mockState, products: [] };
      const result = selectAllProducts.projector(emptyState);
      expect(result).toEqual([]);
    });
  });

  describe('selectProductsLoading', () => {
    it('deve selecionar o estado de loading', () => {
      const result = selectProductsLoading.projector(mockState);
      expect(result).toBe(false);
    });

    it('deve retornar true quando loading estiver true', () => {
      const loadingState: ProductsState = { ...mockState, loading: true };
      const result = selectProductsLoading.projector(loadingState);
      expect(result).toBe(true);
    });
  });

  describe('selectProductsError', () => {
    it('deve selecionar erro quando existir', () => {
      const errorState: ProductsState = { ...mockState, error: 'Erro de teste' };
      const result = selectProductsError.projector(errorState);
      expect(result).toBe('Erro de teste');
    });

    it('deve retornar null quando não houver erro', () => {
      const result = selectProductsError.projector(mockState);
      expect(result).toBeNull();
    });
  });

  describe('selectSelectedProduct', () => {
    it('deve selecionar o produto selecionado', () => {
      const result = selectSelectedProduct.projector(mockState);
      expect(result).toEqual(mockProduct);
    });

    it('deve retornar null quando não houver produto selecionado', () => {
      const stateWithoutSelection: ProductsState = { ...mockState, selectedProduct: null };
      const result = selectSelectedProduct.projector(stateWithoutSelection);
      expect(result).toBeNull();
    });
  });

  describe('selectProductById', () => {
    it('deve selecionar produto por ID', () => {
      const selector = selectProductById(2);
      const result = selector.projector(mockProducts);
      expect(result?.id).toBe(2);
      expect(result?.title).toBe('Product 2');
    });

    it('deve retornar undefined quando produto não existir', () => {
      const selector = selectProductById(999);
      const result = selector.projector(mockProducts);
      expect(result).toBeUndefined();
    });
  });

  describe('Memoization', () => {
    it('deve retornar o mesmo valor se o estado não mudar', () => {
      const result1 = selectAllProducts.projector(mockState);
      const result2 = selectAllProducts.projector(mockState);
      expect(result1).toBe(result2);
    });

    it('deve retornar novo valor se o estado mudar', () => {
      const result1 = selectAllProducts.projector(mockState);
      const newState: ProductsState = {
        ...mockState,
        products: [...mockProducts, { ...mockProduct, id: 4 }],
      };
      const result2 = selectAllProducts.projector(newState);
      expect(result1).not.toBe(result2);
    });
  });
});
