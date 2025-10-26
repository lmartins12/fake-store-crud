import { TestBed } from '@angular/core/testing';
import { IProduct } from '../interfaces/product';
import { MockProductService } from './mock-product.service';

describe('MockProductService', () => {
  let service: MockProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProductService],
    });
    service = TestBed.inject(MockProductService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllProducts', () => {
    it('deve retornar todos os produtos', (done) => {
      service.getAllProducts().subscribe({
        next: (products) => {
          expect(products).toBeInstanceOf(Array);
          expect(products.length).toBeGreaterThan(0);
          done();
        },
      });
    });

    it('deve simular delay de rede', (done) => {
      const startTime = Date.now();
      service.getAllProducts().subscribe({
        next: () => {
          const elapsed = Date.now() - startTime;
          expect(elapsed).toBeGreaterThanOrEqual(400);
          done();
        },
      });
    });
  });

  describe('getProductById', () => {
    it('deve retornar um produto existente', (done) => {
      service.getProductById(1).subscribe({
        next: (product) => {
          expect(product).toBeTruthy();
          expect(product.id).toBe(1);
          expect(product.title).toBeTruthy();
          done();
        },
      });
    });

    it('deve retornar erro para produto inexistente', (done) => {
      service.getProductById(999).subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          expect(error.message).toContain('não encontrado');
          done();
        },
      });
    });
  });

  describe('createProduct', () => {
    it('deve criar um novo produto com ID automático', (done) => {
      const newProduct: Omit<IProduct, 'id'> = {
        title: 'Produto Teste',
        price: 99.99,
        description: 'Descrição do produto teste',
        category: 'electronics',
        image: 'https://example.com/image.jpg',
      };

      service.createProduct(newProduct).subscribe({
        next: (product) => {
          expect(product.id).toBeTruthy();
          expect(product.title).toBe(newProduct.title);
          expect(product.price).toBe(newProduct.price);
          done();
        },
      });
    });

    it('deve adicionar o produto à lista', (done) => {
      const newProduct: Omit<IProduct, 'id'> = {
        title: 'Produto Teste 2',
        price: 199.99,
        description: 'Descrição do produto teste 2',
        category: 'jewelery',
        image: 'https://example.com/image2.jpg',
      };

      service.createProduct(newProduct).subscribe({
        next: (createdProduct) => {
          service.getProductById(createdProduct.id).subscribe({
            next: (retrievedProduct) => {
              expect(retrievedProduct.title).toBe(newProduct.title);
              done();
            },
          });
        },
      });
    });
  });

  describe('updateProduct', () => {
    it('deve atualizar um produto existente', (done) => {
      service.getProductById(1).subscribe({
        next: (product) => {
          const updatedProduct: IProduct = {
            ...product,
            title: 'Título Atualizado',
            price: 999.99,
          };

          service.updateProduct(1, updatedProduct).subscribe({
            next: (result) => {
              expect(result.title).toBe('Título Atualizado');
              expect(result.price).toBe(999.99);
              expect(result.id).toBe(1);
              done();
            },
          });
        },
      });
    });

    it('deve retornar erro ao atualizar produto inexistente', (done) => {
      const fakeProduct: IProduct = {
        id: 999,
        title: 'Fake',
        price: 1,
        description: 'Fake',
        category: 'electronics',
        image: 'fake.jpg',
      };

      service.updateProduct(999, fakeProduct).subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          expect(error.message).toContain('não encontrado');
          done();
        },
      });
    });
  });

  describe('deleteProduct', () => {
    it('deve deletar um produto existente', (done) => {
      service.deleteProduct(1).subscribe({
        next: () => {
          service.getProductById(1).subscribe({
            error: (error) => {
              expect(error).toBeTruthy();
              done();
            },
          });
        },
      });
    });

    it('deve retornar erro ao deletar produto inexistente', (done) => {
      service.deleteProduct(999).subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          expect(error.message).toContain('não encontrado');
          done();
        },
      });
    });
  });
});
