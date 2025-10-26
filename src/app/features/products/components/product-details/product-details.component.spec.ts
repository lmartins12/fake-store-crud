import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsComponent } from './product-details.component';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir evento closeDialog quando onClose for chamado', () => {
    jest.spyOn(component.closeDialog, 'emit');
    component.onClose();
    expect(component.closeDialog.emit).toHaveBeenCalled();
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
