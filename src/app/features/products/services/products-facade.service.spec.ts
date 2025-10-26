import { TestBed } from '@angular/core/testing';
import { IProduct, MockProductService } from '@core/index';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { ProductsFacadeService } from './products-facade.service';

describe('ProductsFacadeService', () => {
  let service: ProductsFacadeService;
  let mockProductService: jest.Mocked<MockProductService>;
  let messageService: jest.Mocked<MessageService>;

  const mockProduct: IProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test Description',
    category: 'test',
    image: 'https://example.com/image.jpg',
  };

  beforeEach(() => {
    mockProductService = {
      getAllProducts: jest.fn(),
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
    } as unknown as jest.Mocked<MockProductService>;

    messageService = {
      add: jest.fn(),
    } as unknown as jest.Mocked<MessageService>;

    TestBed.configureTestingModule({
      providers: [
        ProductsFacadeService,
        { provide: MockProductService, useValue: mockProductService },
        { provide: MessageService, useValue: messageService },
      ],
    });

    service = TestBed.inject(ProductsFacadeService);
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve carregar produtos chamando productService.getAllProducts', (done) => {
    const products: IProduct[] = [mockProduct];
    mockProductService.getAllProducts.mockReturnValue(of(products));

    service.loadProducts().subscribe((result) => {
      expect(result).toEqual(products);
      expect(mockProductService.getAllProducts).toHaveBeenCalled();
      done();
    });
  });

  it('deve criar produto e exibir mensagem de sucesso', (done) => {
    const productData: Omit<IProduct, 'id'> = {
      title: 'New Product',
      price: 50,
      description: 'New Description',
      category: 'new',
      image: 'https://example.com/new.jpg',
    };

    mockProductService.createProduct.mockReturnValue(of(mockProduct));

    service.createProduct(productData).subscribe((result) => {
      expect(result).toEqual(mockProduct);
      expect(mockProductService.createProduct).toHaveBeenCalledWith(productData);
      expect(messageService.add).toHaveBeenCalled();
      done();
    });
  });

  it('deve atualizar produto e exibir mensagem de sucesso', (done) => {
    const updatedProduct: IProduct = { ...mockProduct, title: 'Updated Product' };
    mockProductService.updateProduct.mockReturnValue(of(updatedProduct));

    service.updateProduct(1, updatedProduct).subscribe((result) => {
      expect(result).toEqual(updatedProduct);
      expect(mockProductService.updateProduct).toHaveBeenCalledWith(1, updatedProduct);
      expect(messageService.add).toHaveBeenCalled();
      done();
    });
  });

  it('deve deletar produto e exibir mensagem de sucesso', (done) => {
    mockProductService.deleteProduct.mockReturnValue(of(undefined));

    service.deleteProduct(1).subscribe(() => {
      expect(mockProductService.deleteProduct).toHaveBeenCalledWith(1);
      expect(messageService.add).toHaveBeenCalled();
      done();
    });
  });

  it('deve exibir mensagem de erro quando showError for chamado', () => {
    service.showError('load');
    expect(messageService.add).toHaveBeenCalled();
  });
});
