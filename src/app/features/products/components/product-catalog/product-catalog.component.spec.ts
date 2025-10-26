import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IProduct } from '@core/index';
import { ProductCatalogComponent } from './product-catalog.component';

describe('ProductCatalogComponent', () => {
  let component: ProductCatalogComponent;
  let fixture: ComponentFixture<ProductCatalogComponent>;

  const mockProduct: IProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test Description',
    category: 'test',
    image: 'https://example.com/image.jpg',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCatalogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCatalogComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir evento view quando onView for chamado', () => {
    jest.spyOn(component.view, 'emit');
    component.onView(mockProduct);
    expect(component.view.emit).toHaveBeenCalledWith(mockProduct);
  });

  it('deve emitir evento edit quando onEdit for chamado', () => {
    jest.spyOn(component.edit, 'emit');
    component.onEdit(mockProduct);
    expect(component.edit.emit).toHaveBeenCalledWith(mockProduct);
  });

  it('deve emitir evento delete quando onDelete for chamado', () => {
    jest.spyOn(component.delete, 'emit');
    component.onDelete(mockProduct);
    expect(component.delete.emit).toHaveBeenCalledWith(mockProduct);
  });

  it('deve esconder imagem e mostrar fallback quando onImageError for chamado', () => {
    const mockImg = document.createElement('img');
    const mockFallback = document.createElement('div');
    mockFallback.style.display = 'none';

    Object.defineProperty(mockImg, 'nextElementSibling', {
      value: mockFallback,
      configurable: true,
    });

    const event = new Event('error');
    Object.defineProperty(event, 'target', { value: mockImg, enumerable: true });

    component.onImageError(event);
    expect(mockImg.style.display).toBe('none');
    expect(mockFallback.style.display).toBe('flex');
  });
});
