import { DestroyRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IProduct } from '@core/index';
import { ConfirmationService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { PRODUCTS_LIST_CONSTANTS } from './constants/products-list.constants';
import { ProductsListPage } from './products-list.page';
import { ProductsFacadeService } from './services/products-facade.service';

describe('ProductsListPage', () => {
  let component: ProductsListPage;
  let mockFacade: jest.Mocked<ProductsFacadeService>;
  let mockConfirmationService: jest.Mocked<ConfirmationService>;
  let mockDestroyRef: jest.Mocked<DestroyRef>;

  const mockProducts: IProduct[] = [
    {
      id: 1,
      title: 'Produto 1',
      price: 100,
      description: 'Descrição 1',
      category: 'Categoria 1',
      image: 'https://exemplo.com/imagem1.jpg',
    },
    {
      id: 2,
      title: 'Produto 2',
      price: 200,
      description: 'Descrição 2',
      category: 'Categoria 2',
      image: 'https://exemplo.com/imagem2.jpg',
    },
  ];

  beforeEach(() => {
    mockFacade = {
      loadProducts: jest.fn(),
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
      showError: jest.fn(),
    } as unknown as jest.Mocked<ProductsFacadeService>;

    mockConfirmationService = {
      confirm: jest.fn(),
    } as unknown as jest.Mocked<ConfirmationService>;

    mockDestroyRef = {} as unknown as jest.Mocked<DestroyRef>;

    TestBed.configureTestingModule({
      providers: [
        ProductsListPage,
        { provide: ProductsFacadeService, useValue: mockFacade },
        { provide: ConfirmationService, useValue: mockConfirmationService },
        { provide: DestroyRef, useValue: mockDestroyRef },
      ],
    });

    component = TestBed.inject(ProductsListPage);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('deve chamar loadProducts', () => {
      const loadProductsSpy = jest.spyOn(component, 'loadProducts');
      mockFacade.loadProducts.mockReturnValue(of(mockProducts));

      component.ngOnInit();

      expect(loadProductsSpy).toHaveBeenCalled();
    });
  });

  describe('loadProducts', () => {
    it('deve carregar produtos com sucesso', () => {
      mockFacade.loadProducts.mockReturnValue(of(mockProducts));

      component.loadProducts();

      expect(component.loading()).toBe(false);
      expect(component.products()).toEqual(mockProducts);
      expect(mockFacade.loadProducts).toHaveBeenCalled();
    });

    it('deve tratar erro ao carregar produtos', () => {
      mockFacade.loadProducts.mockReturnValue(throwError(() => new Error('Erro ao carregar')));

      component.loadProducts();

      expect(component.loading()).toBe(false);
      expect(mockFacade.showError).toHaveBeenCalledWith('load');
    });

    it('deve definir loading como true durante o carregamento', () => {
      mockFacade.loadProducts.mockReturnValue(of(mockProducts));

      component.loadProducts();

      expect(mockFacade.loadProducts).toHaveBeenCalled();
    });
  });

  describe('openCreateDialog', () => {
    it('deve abrir o dialog de criação', (done) => {
      component.openCreateDialog();

      expect(component.showFormDialog()).toBe(false);
      expect(component.showDetailsDialog()).toBe(false);
      expect(component.selectedProduct()).toBeNull();

      setTimeout(() => {
        expect(component.showFormDialog()).toBe(true);
        done();
      }, 0);
    });

    it('deve resetar os dialogs antes de abrir', () => {
      component.showFormDialog.set(true);
      component.showDetailsDialog.set(true);
      component.selectedProduct.set(mockProducts[0]);

      component.openCreateDialog();

      expect(component.showFormDialog()).toBe(false);
      expect(component.showDetailsDialog()).toBe(false);
      expect(component.selectedProduct()).toBeNull();
    });
  });

  describe('openEditDialog', () => {
    it('deve abrir o dialog de edição com o produto selecionado', (done) => {
      const product = mockProducts[0];

      component.openEditDialog(product);

      expect(component.showFormDialog()).toBe(false);
      expect(component.showDetailsDialog()).toBe(false);

      setTimeout(() => {
        expect(component.selectedProduct()).toEqual(product);
        expect(component.showFormDialog()).toBe(true);
        done();
      }, 0);
    });

    it('deve resetar os dialogs antes de abrir', () => {
      component.showFormDialog.set(true);
      component.showDetailsDialog.set(true);

      component.openEditDialog(mockProducts[0]);

      expect(component.showFormDialog()).toBe(false);
      expect(component.showDetailsDialog()).toBe(false);
    });
  });

  describe('openDetailsDialog', () => {
    it('deve abrir o dialog de detalhes com o produto selecionado', (done) => {
      const product = mockProducts[0];

      component.openDetailsDialog(product);

      expect(component.showFormDialog()).toBe(false);
      expect(component.showDetailsDialog()).toBe(false);

      setTimeout(() => {
        expect(component.selectedProduct()).toEqual(product);
        expect(component.showDetailsDialog()).toBe(true);
        done();
      }, 0);
    });

    it('deve resetar os dialogs antes de abrir', () => {
      component.showFormDialog.set(true);
      component.showDetailsDialog.set(true);

      component.openDetailsDialog(mockProducts[0]);

      expect(component.showFormDialog()).toBe(false);
      expect(component.showDetailsDialog()).toBe(false);
    });
  });

  describe('closeDialogs', () => {
    it('deve fechar todos os dialogs', () => {
      component.showFormDialog.set(true);
      component.showDetailsDialog.set(true);
      component.selectedProduct.set(mockProducts[0]);

      component.closeDialogs();

      expect(component.showFormDialog()).toBe(false);
      expect(component.showDetailsDialog()).toBe(false);
      expect(component.selectedProduct()).toBeNull();
    });
  });

  describe('setViewMode', () => {
    it('deve definir o modo de visualização como table', () => {
      component.setViewMode('table');

      expect(component.viewMode()).toBe('table');
    });

    it('deve definir o modo de visualização como catalog', () => {
      component.setViewMode('catalog');

      expect(component.viewMode()).toBe('catalog');
    });
  });

  describe('toggleViewMode', () => {
    it('deve alternar de table para catalog', () => {
      component.viewMode.set('table');

      component.toggleViewMode();

      expect(component.viewMode()).toBe('catalog');
    });

    it('deve alternar de catalog para table', () => {
      component.viewMode.set('catalog');

      component.toggleViewMode();

      expect(component.viewMode()).toBe('table');
    });
  });

  describe('handleSave', () => {
    beforeEach(() => {
      mockFacade.loadProducts.mockReturnValue(of(mockProducts));
    });

    it('deve criar um novo produto quando não há produto selecionado', () => {
      const newProduct: Omit<IProduct, 'id'> = {
        title: 'Novo Produto',
        price: 150,
        description: 'Nova Descrição',
        category: 'Nova Categoria',
        image: 'https://exemplo.com/nova-imagem.jpg',
      };

      mockFacade.createProduct.mockReturnValue(of({ ...newProduct, id: 3 } as IProduct));

      component.selectedProduct.set(null);
      component.handleSave(newProduct);

      expect(component.loading()).toBe(false);
      expect(mockFacade.createProduct).toHaveBeenCalledWith(newProduct);
      expect(component.showFormDialog()).toBe(false);
      expect(component.showDetailsDialog()).toBe(false);
      expect(component.selectedProduct()).toBeNull();
    });

    it('deve atualizar um produto existente quando há produto selecionado', () => {
      const updatedProduct: IProduct = {
        ...mockProducts[0],
        title: 'Produto Atualizado',
      };

      mockFacade.updateProduct.mockReturnValue(of(updatedProduct));

      component.selectedProduct.set(mockProducts[0]);
      component.handleSave(updatedProduct);

      expect(component.loading()).toBe(false);
      expect(mockFacade.updateProduct).toHaveBeenCalledWith(updatedProduct.id, updatedProduct);
      expect(component.showFormDialog()).toBe(false);
      expect(component.showDetailsDialog()).toBe(false);
    });

    it('deve tratar erro ao criar produto', () => {
      const newProduct: Omit<IProduct, 'id'> = {
        title: 'Novo Produto',
        price: 150,
        description: 'Nova Descrição',
        category: 'Nova Categoria',
        image: 'https://exemplo.com/nova-imagem.jpg',
      };

      mockFacade.createProduct.mockReturnValue(throwError(() => new Error('Erro ao criar')));

      component.selectedProduct.set(null);
      component.handleSave(newProduct);

      expect(component.loading()).toBe(false);
      expect(mockFacade.showError).toHaveBeenCalledWith('create');
    });

    it('deve tratar erro ao atualizar produto', () => {
      const updatedProduct: IProduct = {
        ...mockProducts[0],
        title: 'Produto Atualizado',
      };

      mockFacade.updateProduct.mockReturnValue(throwError(() => new Error('Erro ao atualizar')));

      component.selectedProduct.set(mockProducts[0]);
      component.handleSave(updatedProduct);

      expect(component.loading()).toBe(false);
      expect(mockFacade.showError).toHaveBeenCalledWith('update');
    });

    it('deve fechar os dialogs antes de salvar', () => {
      const newProduct: Omit<IProduct, 'id'> = {
        title: 'Novo Produto',
        price: 150,
        description: 'Nova Descrição',
        category: 'Nova Categoria',
        image: 'https://exemplo.com/nova-imagem.jpg',
      };

      mockFacade.createProduct.mockReturnValue(of({ ...newProduct, id: 3 } as IProduct));

      component.showFormDialog.set(true);
      component.handleSave(newProduct);

      expect(component.showFormDialog()).toBe(false);
      expect(component.showDetailsDialog()).toBe(false);
    });

    it('deve definir loading como true durante o salvamento', () => {
      const newProduct: Omit<IProduct, 'id'> = {
        title: 'Novo Produto',
        price: 150,
        description: 'Nova Descrição',
        category: 'Nova Categoria',
        image: 'https://exemplo.com/nova-imagem.jpg',
      };

      mockFacade.createProduct.mockReturnValue(of({ ...newProduct, id: 3 } as IProduct));

      component.handleSave(newProduct);

      expect(mockFacade.createProduct).toHaveBeenCalled();
    });
  });

  describe('handleDelete', () => {
    beforeEach(() => {
      mockFacade.loadProducts.mockReturnValue(of(mockProducts));
    });

    it('deve abrir modal de confirmação ao deletar', () => {
      const product = mockProducts[0];

      component.handleDelete(product);

      expect(mockConfirmationService.confirm).toHaveBeenCalledWith(
        expect.objectContaining({
          message: PRODUCTS_LIST_CONSTANTS.MODAL_CONFIRMATION.message,
          header: PRODUCTS_LIST_CONSTANTS.MODAL_CONFIRMATION.header,
          icon: PRODUCTS_LIST_CONSTANTS.MODAL_CONFIRMATION.icon,
        })
      );
    });

    it('deve deletar produto ao confirmar', () => {
      const product = mockProducts[0];
      mockFacade.deleteProduct.mockReturnValue(of(void 0));

      mockConfirmationService.confirm.mockImplementation((confirmation) => {
        if (confirmation.accept) {
          confirmation.accept();
        }
        return mockConfirmationService;
      });

      component.handleDelete(product);

      expect(component.loading()).toBe(false);
      expect(mockFacade.deleteProduct).toHaveBeenCalledWith(product.id);
    });

    it('deve tratar erro ao deletar produto', () => {
      const product = mockProducts[0];
      mockFacade.deleteProduct.mockReturnValue(throwError(() => new Error('Erro ao deletar')));

      mockConfirmationService.confirm.mockImplementation((confirmation) => {
        if (confirmation.accept) {
          confirmation.accept();
        }
        return mockConfirmationService;
      });

      component.handleDelete(product);

      expect(component.loading()).toBe(false);
      expect(mockFacade.showError).toHaveBeenCalledWith('delete');
    });

    it('deve definir loading como true durante a deleção', () => {
      const product = mockProducts[0];
      mockFacade.deleteProduct.mockReturnValue(of(void 0));

      mockConfirmationService.confirm.mockImplementation((confirmation) => {
        if (confirmation.accept) {
          confirmation.accept();
        }
        return mockConfirmationService;
      });

      component.handleDelete(product);

      expect(mockFacade.deleteProduct).toHaveBeenCalled();
    });

    it('deve recarregar produtos após deletar com sucesso', () => {
      const product = mockProducts[0];
      const loadProductsSpy = jest.spyOn(component, 'loadProducts');
      mockFacade.deleteProduct.mockReturnValue(of(void 0));

      mockConfirmationService.confirm.mockImplementation((confirmation) => {
        if (confirmation.accept) {
          confirmation.accept();
        }
        return mockConfirmationService;
      });

      component.handleDelete(product);

      expect(loadProductsSpy).toHaveBeenCalled();
    });
  });
});
