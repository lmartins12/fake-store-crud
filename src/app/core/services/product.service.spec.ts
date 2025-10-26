import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IProduct } from '../interfaces/product';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'https://fakestoreapi.com/products';

  const mockProduct: IProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test Description',
    category: 'test',
    image: 'https://example.com/image.jpg',
  };

  const mockProducts: IProduct[] = [
    mockProduct,
    { ...mockProduct, id: 2, title: 'Test Product 2' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllProducts', () => {
    it('deve retornar todos os produtos', (done) => {
      service.getAllProducts().subscribe({
        next: (products) => {
          expect(products).toEqual(mockProducts);
          expect(products.length).toBe(2);
          done();
        },
        error: done.fail,
      });

      const req = httpTestingController.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockProducts);
    });

    it('deve retornar array vazio quando não há produtos', (done) => {
      service.getAllProducts().subscribe({
        next: (products) => {
          expect(products).toEqual([]);
          expect(products.length).toBe(0);
          done();
        },
        error: done.fail,
      });

      const req = httpTestingController.expectOne(apiUrl);
      req.flush([]);
    });

    it('deve lidar com erro HTTP', (done) => {
      const errorMessage = 'Erro ao carregar produtos';

      service.getAllProducts().subscribe({
        next: () => done.fail('Deveria ter falhado'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
          done();
        },
      });

      const req = httpTestingController.expectOne(apiUrl);
      req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('getProductById', () => {
    it('deve retornar um produto por ID', (done) => {
      const productId = 1;

      service.getProductById(productId).subscribe({
        next: (product) => {
          expect(product).toEqual(mockProduct);
          expect(product.id).toBe(productId);
          done();
        },
        error: done.fail,
      });

      const req = httpTestingController.expectOne(`${apiUrl}/${productId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProduct);
    });

    it('deve lidar com produto não encontrado (404)', (done) => {
      const productId = 999;

      service.getProductById(productId).subscribe({
        next: () => done.fail('Deveria ter falhado'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(404);
          done();
        },
      });

      const req = httpTestingController.expectOne(`${apiUrl}/${productId}`);
      req.flush('Produto não encontrado', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('createProduct', () => {
    it('deve criar um novo produto', (done) => {
      const newProduct: Omit<IProduct, 'id'> = {
        title: 'Novo Produto',
        price: 50.0,
        description: 'Nova Descrição',
        category: 'new',
        image: 'https://example.com/new.jpg',
      };

      const createdProduct: IProduct = { ...newProduct, id: 3 };

      service.createProduct(newProduct).subscribe({
        next: (product) => {
          expect(product).toEqual(createdProduct);
          expect(product.id).toBe(3);
          done();
        },
        error: done.fail,
      });

      const req = httpTestingController.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newProduct);
      req.flush(createdProduct);
    });

    it('deve lidar com erro ao criar produto', (done) => {
      const newProduct: Omit<IProduct, 'id'> = {
        title: 'Novo Produto',
        price: 50.0,
        description: 'Nova Descrição',
        category: 'new',
        image: 'https://example.com/new.jpg',
      };

      service.createProduct(newProduct).subscribe({
        next: () => done.fail('Deveria ter falhado'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(400);
          done();
        },
      });

      const req = httpTestingController.expectOne(apiUrl);
      req.flush('Dados inválidos', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('updateProduct', () => {
    it('deve atualizar um produto existente', (done) => {
      const productId = 1;
      const updatedProduct: IProduct = { ...mockProduct, title: 'Produto Atualizado' };

      service.updateProduct(productId, updatedProduct).subscribe({
        next: (product) => {
          expect(product).toEqual(updatedProduct);
          expect(product.title).toBe('Produto Atualizado');
          done();
        },
        error: done.fail,
      });

      const req = httpTestingController.expectOne(`${apiUrl}/${productId}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedProduct);
      req.flush(updatedProduct);
    });

    it('deve lidar com erro ao atualizar produto inexistente', (done) => {
      const productId = 999;
      const updatedProduct: IProduct = { ...mockProduct, id: productId };

      service.updateProduct(productId, updatedProduct).subscribe({
        next: () => done.fail('Deveria ter falhado'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(404);
          done();
        },
      });

      const req = httpTestingController.expectOne(`${apiUrl}/${productId}`);
      req.flush('Produto não encontrado', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('deleteProduct', () => {
    it('deve deletar um produto', (done) => {
      const productId = 1;

      service.deleteProduct(productId).subscribe({
        next: (result) => {
          expect(result).toBeNull();
          done();
        },
        error: done.fail,
      });

      const req = httpTestingController.expectOne(`${apiUrl}/${productId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('deve lidar com erro ao deletar produto inexistente', (done) => {
      const productId = 999;

      service.deleteProduct(productId).subscribe({
        next: () => done.fail('Deveria ter falhado'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(404);
          done();
        },
      });

      const req = httpTestingController.expectOne(`${apiUrl}/${productId}`);
      req.flush('Produto não encontrado', { status: 404, statusText: 'Not Found' });
    });

    it('deve lidar com erro interno do servidor', (done) => {
      const productId = 1;

      service.deleteProduct(productId).subscribe({
        next: () => done.fail('Deveria ter falhado'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
          done();
        },
      });

      const req = httpTestingController.expectOne(`${apiUrl}/${productId}`);
      req.flush('Erro interno', { status: 500, statusText: 'Internal Server Error' });
    });
  });
});
