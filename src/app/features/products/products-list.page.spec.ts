import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IProduct } from '@core/index';
import { ConfirmationService } from 'primeng/api';
import { ProductsListPage } from './products-list.page';
import { ProductsFacadeService } from './services/products-facade.service';

describe('ProductsListPage', () => {
  let component: ProductsListPage;
  let mockFacade: jest.Mocked<ProductsFacadeService>;
  let mockConfirmationService: jest.Mocked<ConfirmationService>;

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
      products$: signal(mockProducts),
      loading$: signal(false),
      error$: signal(null),
      selectedProduct$: signal(null),
      loadProducts: jest.fn(),
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
      setSelectedProduct: jest.fn(),
      clearSelectedProduct: jest.fn(),
      clearError: jest.fn(),
      showError: jest.fn(),
    } as unknown as jest.Mocked<ProductsFacadeService>;

    mockConfirmationService = {
      confirm: jest.fn(),
    } as unknown as jest.Mocked<ConfirmationService>;

    TestBed.configureTestingModule({
      providers: [
        ProductsListPage,
        { provide: ProductsFacadeService, useValue: mockFacade },
        { provide: ConfirmationService, useValue: mockConfirmationService },
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

      component.ngOnInit();

      expect(loadProductsSpy).toHaveBeenCalled();
    });
  });

  describe('loadProducts', () => {
    it('deve disparar ação de carregar produtos', () => {
      component.loadProducts();

      expect(mockFacade.loadProducts).toHaveBeenCalled();
    });
  });

  describe('Signals do facade', () => {
    it('deve usar products$ do facade', () => {
      expect(component.products()).toEqual(mockProducts);
    });

    it('deve usar loading$ do facade', () => {
      expect(component.loading).toBe(mockFacade.loading$);
    });
  });

  describe('Controle de diálogos', () => {
    it('deve abrir diálogo de criação', () => {
      component.openCreateDialog();

      setTimeout(() => {
        expect(component.showFormDialog()).toBe(true);
        expect(component.selectedProduct()).toBeNull();
      }, 0);
    });

    it('deve abrir diálogo de edição', () => {
      const product = mockProducts[0];

      component.openEditDialog(product);

      setTimeout(() => {
        expect(component.showFormDialog()).toBe(true);
        expect(component.selectedProduct()).toEqual(product);
      }, 0);
    });

    it('deve abrir diálogo de detalhes', () => {
      const product = mockProducts[0];

      component.openDetailsDialog(product);

      setTimeout(() => {
        expect(component.showDetailsDialog()).toBe(true);
        expect(component.selectedProduct()).toEqual(product);
      }, 0);
    });

    it('deve fechar diálogos', () => {
      component.showFormDialog.set(true);
      component.showDetailsDialog.set(true);
      component.selectedProduct.set(mockProducts[0]);

      component.closeDialogs();

      expect(component.showFormDialog()).toBe(false);
      expect(component.showDetailsDialog()).toBe(false);
      expect(component.selectedProduct()).toBeNull();
    });
  });

  describe('Controle de visualização', () => {
    it('deve definir modo de visualização', () => {
      component.setViewMode('catalog');
      expect(component.viewMode()).toBe('catalog');

      component.setViewMode('table');
      expect(component.viewMode()).toBe('table');
    });

    it('deve alternar modo de visualização', () => {
      component.viewMode.set('table');
      component.toggleViewMode();
      expect(component.viewMode()).toBe('catalog');

      component.toggleViewMode();
      expect(component.viewMode()).toBe('table');
    });
  });

  describe('handleSave', () => {
    it('deve criar produto quando não houver produto selecionado', () => {
      const newProduct: Partial<IProduct> = {
        title: 'Novo Produto',
        price: 50,
        description: 'Nova Descrição',
        category: 'Nova Categoria',
        image: 'https://exemplo.com/nova.jpg',
      };

      component.selectedProduct.set(null);
      component.handleSave(newProduct);

      expect(mockFacade.createProduct).toHaveBeenCalledWith(newProduct);
      expect(component.showFormDialog()).toBe(false);
    });

    it('deve atualizar produto quando houver produto selecionado', () => {
      const updatedProduct: IProduct = {
        ...mockProducts[0],
        title: 'Produto Atualizado',
      };

      component.selectedProduct.set(mockProducts[0]);
      component.handleSave(updatedProduct);

      expect(mockFacade.updateProduct).toHaveBeenCalledWith(updatedProduct.id, updatedProduct);
      expect(component.showFormDialog()).toBe(false);
    });
  });

  describe('handleDelete', () => {
    it('deve solicitar confirmação antes de deletar', () => {
      const product = mockProducts[0];

      component.handleDelete(product);

      expect(mockConfirmationService.confirm).toHaveBeenCalled();
    });

    it('deve deletar produto ao confirmar', () => {
      const product = mockProducts[0];
      let acceptCallback: (() => void) | undefined;

      (mockConfirmationService.confirm as jest.Mock).mockImplementation((config) => {
        acceptCallback = config.accept;
        return mockConfirmationService;
      });

      component.handleDelete(product);

      expect(mockConfirmationService.confirm).toHaveBeenCalled();

      if (acceptCallback) {
        acceptCallback();
        expect(mockFacade.deleteProduct).toHaveBeenCalledWith(product.id);
      }
    });
  });
});
