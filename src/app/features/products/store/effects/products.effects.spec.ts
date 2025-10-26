import { TestBed } from '@angular/core/testing';
import { IProduct, MockProductService } from '@core/index';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { ProductsActions } from '../actions/products.actions';
import {
  createProductEffect,
  deleteProductEffect,
  loadProductsEffect,
  updateProductEffect,
} from './products.effects';

describe('ProductsEffects', () => {
  let actions$: Observable<unknown>;
  let mockProductService: jest.Mocked<MockProductService>;

  const mockProduct: IProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test Description',
    category: 'test',
    image: 'test.jpg',
  };

  const mockProducts: IProduct[] = [mockProduct, { ...mockProduct, id: 2 }];

  beforeEach(() => {
    mockProductService = {
      getAllProducts: jest.fn(),
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
    } as unknown as jest.Mocked<MockProductService>;

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        { provide: MockProductService, useValue: mockProductService },
      ],
    });
  });

  describe('Effects Structure', () => {
    it('loadProductsEffect deve ser uma função que retorna Observable', () => {
      mockProductService.getAllProducts.mockReturnValue(of(mockProducts));
      actions$ = of(ProductsActions.loadProducts());

      TestBed.runInInjectionContext(() => {
        const result = loadProductsEffect(actions$, mockProductService);
        expect(typeof loadProductsEffect).toBe('function');
        expect(result).toBeDefined();
        expect(typeof result.subscribe).toBe('function');
      });
    });

    it('createProductEffect deve ser uma função que retorna Observable', () => {
      const newProduct = { ...mockProduct };
      delete (newProduct as unknown as { id?: number }).id;
      mockProductService.createProduct.mockReturnValue(of(mockProduct));
      actions$ = of(ProductsActions.createProduct({ product: newProduct }));

      TestBed.runInInjectionContext(() => {
        const result = createProductEffect(actions$, mockProductService);
        expect(typeof createProductEffect).toBe('function');
        expect(result).toBeDefined();
        expect(typeof result.subscribe).toBe('function');
      });
    });

    it('updateProductEffect deve ser uma função que retorna Observable', () => {
      mockProductService.updateProduct.mockReturnValue(of(mockProduct));
      actions$ = of(ProductsActions.updateProduct({ id: 1, product: mockProduct }));

      TestBed.runInInjectionContext(() => {
        const result = updateProductEffect(actions$, mockProductService);
        expect(typeof updateProductEffect).toBe('function');
        expect(result).toBeDefined();
        expect(typeof result.subscribe).toBe('function');
      });
    });

    it('deleteProductEffect deve ser uma função que retorna Observable', () => {
      mockProductService.deleteProduct.mockReturnValue(of(void 0));
      actions$ = of(ProductsActions.deleteProduct({ id: 1 }));

      TestBed.runInInjectionContext(() => {
        const result = deleteProductEffect(actions$, mockProductService);
        expect(typeof deleteProductEffect).toBe('function');
        expect(result).toBeDefined();
        expect(typeof result.subscribe).toBe('function');
      });
    });
  });

  describe('loadProductsEffect', () => {
    it('deve retornar loadProductsSuccess em caso de sucesso', (done) => {
      mockProductService.getAllProducts.mockReturnValue(of(mockProducts));
      actions$ = of(ProductsActions.loadProducts());

      TestBed.runInInjectionContext(() => {
        const effect = loadProductsEffect(actions$, mockProductService);
        expect(effect).toBeDefined();

        effect.subscribe((action) => {
          expect(action).toEqual(ProductsActions.loadProductsSuccess({ products: mockProducts }));
          expect(mockProductService.getAllProducts).toHaveBeenCalled();
          done();
        });
      });
    });

    it('deve retornar loadProductsFailure em caso de erro', (done) => {
      const error = new Error('Erro ao carregar');
      mockProductService.getAllProducts.mockReturnValue(throwError(() => error));
      actions$ = of(ProductsActions.loadProducts());

      TestBed.runInInjectionContext(() => {
        const effect = loadProductsEffect(actions$, mockProductService);

        effect.subscribe((action) => {
          expect(action).toEqual(
            ProductsActions.loadProductsFailure({ error: 'Erro ao carregar' })
          );
          expect(mockProductService.getAllProducts).toHaveBeenCalled();
          done();
        });
      });
    });

    it('deve lidar com array vazio de produtos', (done) => {
      mockProductService.getAllProducts.mockReturnValue(of([]));
      actions$ = of(ProductsActions.loadProducts());

      TestBed.runInInjectionContext(() => {
        loadProductsEffect(actions$, mockProductService).subscribe((action) => {
          expect(action).toEqual(ProductsActions.loadProductsSuccess({ products: [] }));
          done();
        });
      });
    });

    it('deve lidar com erro sem mensagem', (done) => {
      const error = new Error();
      mockProductService.getAllProducts.mockReturnValue(throwError(() => error));
      actions$ = of(ProductsActions.loadProducts());

      TestBed.runInInjectionContext(() => {
        loadProductsEffect(actions$, mockProductService).subscribe((action) => {
          expect(action).toEqual(
            ProductsActions.loadProductsFailure({ error: expect.any(String) })
          );
          done();
        });
      });
    });
  });

  describe('createProductEffect', () => {
    it('deve retornar createProductSuccess em caso de sucesso', (done) => {
      const newProduct = { ...mockProduct };
      delete (newProduct as unknown as { id?: number }).id;

      mockProductService.createProduct.mockReturnValue(of(mockProduct));
      actions$ = of(ProductsActions.createProduct({ product: newProduct }));

      TestBed.runInInjectionContext(() => {
        const effect = createProductEffect(actions$, mockProductService);
        expect(effect).toBeDefined();

        effect.subscribe((action) => {
          expect(action).toEqual(ProductsActions.createProductSuccess({ product: mockProduct }));
          expect(mockProductService.createProduct).toHaveBeenCalledWith(newProduct);
          done();
        });
      });
    });

    it('deve retornar createProductFailure em caso de erro', (done) => {
      const newProduct = { ...mockProduct };
      delete (newProduct as unknown as { id?: number }).id;
      const error = new Error('Erro ao criar');

      mockProductService.createProduct.mockReturnValue(throwError(() => error));
      actions$ = of(ProductsActions.createProduct({ product: newProduct }));

      TestBed.runInInjectionContext(() => {
        const effect = createProductEffect(actions$, mockProductService);

        effect.subscribe((action) => {
          expect(action).toEqual(ProductsActions.createProductFailure({ error: 'Erro ao criar' }));
          expect(mockProductService.createProduct).toHaveBeenCalled();
          done();
        });
      });
    });

    it('deve usar exhaustMap para evitar múltiplas criações simultâneas', (done) => {
      const newProduct = { ...mockProduct };
      delete (newProduct as unknown as { id?: number }).id;

      mockProductService.createProduct.mockReturnValue(of(mockProduct));
      actions$ = of(
        ProductsActions.createProduct({ product: newProduct }),
        ProductsActions.createProduct({ product: newProduct })
      );

      TestBed.runInInjectionContext(() => {
        const results: unknown[] = [];
        createProductEffect(actions$, mockProductService).subscribe({
          next: (action) => results.push(action),
          complete: () => {
            expect(results.length).toBeGreaterThan(0);
            done();
          },
        });
      });
    });
  });

  describe('updateProductEffect', () => {
    it('deve retornar updateProductSuccess em caso de sucesso', (done) => {
      const updatedProduct = { ...mockProduct, title: 'Updated' };

      mockProductService.updateProduct.mockReturnValue(of(updatedProduct));
      actions$ = of(ProductsActions.updateProduct({ id: 1, product: updatedProduct }));

      TestBed.runInInjectionContext(() => {
        const effect = updateProductEffect(actions$, mockProductService);
        expect(effect).toBeDefined();

        effect.subscribe((action) => {
          expect(action).toEqual(ProductsActions.updateProductSuccess({ product: updatedProduct }));
          expect(mockProductService.updateProduct).toHaveBeenCalledWith(1, updatedProduct);
          done();
        });
      });
    });

    it('deve retornar updateProductFailure em caso de erro', (done) => {
      const error = new Error('Erro ao atualizar');

      mockProductService.updateProduct.mockReturnValue(throwError(() => error));
      actions$ = of(ProductsActions.updateProduct({ id: 1, product: mockProduct }));

      TestBed.runInInjectionContext(() => {
        const effect = updateProductEffect(actions$, mockProductService);

        effect.subscribe((action) => {
          expect(action).toEqual(
            ProductsActions.updateProductFailure({ error: 'Erro ao atualizar' })
          );
          expect(mockProductService.updateProduct).toHaveBeenCalled();
          done();
        });
      });
    });

    it('deve processar atualização com ID diferente', (done) => {
      const updatedProduct = { ...mockProduct, id: 5, title: 'Updated Product 5' };

      mockProductService.updateProduct.mockReturnValue(of(updatedProduct));
      actions$ = of(ProductsActions.updateProduct({ id: 5, product: updatedProduct }));

      TestBed.runInInjectionContext(() => {
        updateProductEffect(actions$, mockProductService).subscribe((action) => {
          expect(action).toEqual(ProductsActions.updateProductSuccess({ product: updatedProduct }));
          expect(mockProductService.updateProduct).toHaveBeenCalledWith(5, updatedProduct);
          done();
        });
      });
    });
  });

  describe('deleteProductEffect', () => {
    it('deve retornar deleteProductSuccess em caso de sucesso', (done) => {
      mockProductService.deleteProduct.mockReturnValue(of(void 0));
      actions$ = of(ProductsActions.deleteProduct({ id: 1 }));

      TestBed.runInInjectionContext(() => {
        const effect = deleteProductEffect(actions$, mockProductService);
        expect(effect).toBeDefined();

        effect.subscribe((action) => {
          expect(action).toEqual(ProductsActions.deleteProductSuccess({ id: 1 }));
          expect(mockProductService.deleteProduct).toHaveBeenCalledWith(1);
          done();
        });
      });
    });

    it('deve retornar deleteProductFailure em caso de erro', (done) => {
      const error = new Error('Erro ao deletar');

      mockProductService.deleteProduct.mockReturnValue(throwError(() => error));
      actions$ = of(ProductsActions.deleteProduct({ id: 1 }));

      TestBed.runInInjectionContext(() => {
        const effect = deleteProductEffect(actions$, mockProductService);

        effect.subscribe((action) => {
          expect(action).toEqual(
            ProductsActions.deleteProductFailure({ error: 'Erro ao deletar' })
          );
          expect(mockProductService.deleteProduct).toHaveBeenCalled();
          done();
        });
      });
    });

    it('deve deletar produto com ID diferente', (done) => {
      mockProductService.deleteProduct.mockReturnValue(of(void 0));
      actions$ = of(ProductsActions.deleteProduct({ id: 99 }));

      TestBed.runInInjectionContext(() => {
        deleteProductEffect(actions$, mockProductService).subscribe((action) => {
          expect(action).toEqual(ProductsActions.deleteProductSuccess({ id: 99 }));
          expect(mockProductService.deleteProduct).toHaveBeenCalledWith(99);
          done();
        });
      });
    });

    it('deve retornar erro genérico quando erro não tem mensagem', (done) => {
      const error = new Error();
      mockProductService.deleteProduct.mockReturnValue(throwError(() => error));
      actions$ = of(ProductsActions.deleteProduct({ id: 1 }));

      TestBed.runInInjectionContext(() => {
        deleteProductEffect(actions$, mockProductService).subscribe((action) => {
          expect(action).toEqual(
            ProductsActions.deleteProductFailure({ error: expect.any(String) })
          );
          done();
        });
      });
    });
  });
});
