import { TestBed } from '@angular/core/testing';
import { IProduct } from '@core/index';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ProductsActions } from '../store/actions/products.actions';
import { initialProductsState } from '../store/reducers/products.reducer';
import { ProductsFacadeService } from './products-facade.service';

describe('ProductsFacadeService', () => {
  let service: ProductsFacadeService;
  let store: MockStore;
  let dispatchSpy: jest.SpyInstance;

  const mockProduct: IProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test Description',
    category: 'test',
    image: 'https://example.com/image.jpg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsFacadeService,
        provideMockStore({ initialState: { products: initialProductsState } }),
      ],
    });

    service = TestBed.inject(ProductsFacadeService);
    store = TestBed.inject(Store) as MockStore;
    dispatchSpy = jest.spyOn(store, 'dispatch');
  });

  afterEach(() => {
    dispatchSpy.mockRestore();
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  describe('Selectors como signals', () => {
    it('deve expor products$ como signal', () => {
      expect(service.products$).toBeDefined();
      expect(typeof service.products$).toBe('function');
    });

    it('deve expor loading$ como signal', () => {
      expect(service.loading$).toBeDefined();
      expect(typeof service.loading$).toBe('function');
    });

    it('deve expor error$ como signal', () => {
      expect(service.error$).toBeDefined();
      expect(typeof service.error$).toBe('function');
    });

    it('deve expor selectedProduct$ como signal', () => {
      expect(service.selectedProduct$).toBeDefined();
      expect(typeof service.selectedProduct$).toBe('function');
    });
  });

  describe('Actions dispatch', () => {
    it('deve disparar loadProducts action', () => {
      service.loadProducts();
      expect(dispatchSpy).toHaveBeenCalledWith(ProductsActions.loadProducts());
    });

    it('deve disparar createProduct action', () => {
      const productData: Omit<IProduct, 'id'> = {
        title: 'New Product',
        price: 50,
        description: 'New Description',
        category: 'new',
        image: 'https://example.com/new.jpg',
      };

      service.createProduct(productData);

      expect(dispatchSpy).toHaveBeenCalledWith(
        ProductsActions.createProduct({ product: productData })
      );
    });

    it('deve disparar updateProduct action', () => {
      const updatedProduct: IProduct = { ...mockProduct, title: 'Updated Product' };

      service.updateProduct(1, updatedProduct);

      expect(dispatchSpy).toHaveBeenCalledWith(
        ProductsActions.updateProduct({ id: 1, product: updatedProduct })
      );
    });

    it('deve disparar deleteProduct action', () => {
      service.deleteProduct(1);

      expect(dispatchSpy).toHaveBeenCalledWith(ProductsActions.deleteProduct({ id: 1 }));
    });

    it('deve disparar setSelectedProduct action', () => {
      service.setSelectedProduct(mockProduct);

      expect(dispatchSpy).toHaveBeenCalledWith(
        ProductsActions.setSelectedProduct({ product: mockProduct })
      );
    });

    it('deve disparar setSelectedProduct com null', () => {
      service.setSelectedProduct(null);

      expect(dispatchSpy).toHaveBeenCalledWith(
        ProductsActions.setSelectedProduct({ product: null })
      );
    });

    it('deve disparar clearSelectedProduct action', () => {
      service.clearSelectedProduct();

      expect(dispatchSpy).toHaveBeenCalledWith(ProductsActions.clearSelectedProduct());
    });

    it('deve disparar clearError action', () => {
      service.clearError();

      expect(dispatchSpy).toHaveBeenCalledWith(ProductsActions.clearError());
    });
  });
});
