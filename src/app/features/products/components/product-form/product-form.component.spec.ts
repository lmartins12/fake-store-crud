import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IProduct } from '@core/index';
import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

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
      imports: [ProductFormComponent, ReactiveFormsModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário no ngOnInit', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.form.get('title')).toBeTruthy();
    expect(component.form.get('price')).toBeTruthy();
    expect(component.form.get('description')).toBeTruthy();
    expect(component.form.get('category')).toBeTruthy();
    expect(component.form.get('image')).toBeTruthy();
  });

  it('deve emitir saveProduct quando onSubmit for chamado com formulário válido', () => {
    component.ngOnInit();
    jest.spyOn(component.saveProduct, 'emit');

    component.form.patchValue({
      title: 'New Product',
      price: 50,
      description: 'New Description',
      category: 'new',
      image: 'https://example.com/image.jpg',
    });

    component.onSubmit();

    expect(component.saveProduct.emit).toHaveBeenCalled();
    expect(component.form.pristine).toBe(true);
  });

  it('deve emitir dados do formulário sem ID quando for criação de novo produto', () => {
    component.ngOnInit();
    jest.spyOn(component.saveProduct, 'emit');

    component.form.patchValue({
      title: 'New Product',
      price: 50,
      description: 'New Description',
      category: 'new',
      image: 'https://example.com/image.jpg',
    });

    component.onSubmit();

    const emittedValue = (component.saveProduct.emit as jest.Mock).mock.calls[0][0];
    expect(emittedValue).not.toHaveProperty('id');
  });

  it('deve emitir dados do formulário COM ID quando for edição de produto existente', () => {
    // Criar novo componente com produto existente
    const customFixture = TestBed.createComponent(ProductFormComponent);
    const customComponent = customFixture.componentInstance;

    customFixture.componentRef.setInput('product', mockProduct);
    customFixture.detectChanges();

    customComponent.ngOnInit();

    jest.spyOn(customComponent.saveProduct, 'emit');

    customComponent.form.patchValue({
      title: 'Updated Product',
      price: 99.99,
      description: 'Updated Description',
      category: 'test',
      image: 'https://example.com/image.jpg',
    });

    customComponent.onSubmit();

    const emittedValue = (customComponent.saveProduct.emit as jest.Mock).mock.calls[0][0];
    expect(emittedValue).toHaveProperty('id', 1);
  });

  it('não deve emitir saveProduct quando onSubmit for chamado com formulário inválido', () => {
    component.ngOnInit();
    jest.spyOn(component.saveProduct, 'emit');

    component.onSubmit();

    expect(component.saveProduct.emit).not.toHaveBeenCalled();
  });

  it('deve emitir cancelEdit e resetar formulário quando onCancel for chamado', () => {
    component.ngOnInit();
    jest.spyOn(component.cancelEdit, 'emit');

    component.form.patchValue({
      title: 'Test',
      price: 10,
      description: 'Test Description',
      category: 'test',
      image: 'https://example.com/image.jpg',
    });

    component.onCancel();

    expect(component.cancelEdit.emit).toHaveBeenCalled();
    expect(component.form.pristine).toBe(true);
  });

  it('deve retornar erro quando campo é required e está vazio', () => {
    component.ngOnInit();
    const titleControl = component.form.get('title');
    titleControl?.markAsTouched();

    const error = component.getErrorMessage('title');
    expect(error).toBe('Este campo é obrigatório');
  });

  it('deve retornar erro quando campo não atende minlength', () => {
    component.ngOnInit();
    const titleControl = component.form.get('title');
    titleControl?.setValue('ab');
    titleControl?.markAsTouched();

    const error = component.getErrorMessage('title');
    expect(error).toBe('Mínimo de 3 caracteres');
  });

  it('deve retornar erro quando preço é menor que zero', () => {
    component.ngOnInit();
    const priceControl = component.form.get('price');
    priceControl?.setValue(-1);
    priceControl?.markAsTouched();

    const error = component.getErrorMessage('price');
    expect(error).toBe('O valor deve ser maior que zero');
  });

  it('deve retornar erro quando URL é inválida', () => {
    component.ngOnInit();
    const imageControl = component.form.get('image');
    imageControl?.setValue('invalid-url');
    imageControl?.markAsTouched();

    const error = component.getErrorMessage('image');
    expect(error).toBe('URL inválida');
  });

  it('deve retornar string vazia quando campo não tem erro', () => {
    component.ngOnInit();
    const titleControl = component.form.get('title');
    titleControl?.setValue('Valid Title');
    titleControl?.markAsTouched();

    const error = component.getErrorMessage('title');
    expect(error).toBe('');
  });

  it('deve retornar string vazia quando campo não foi tocado', () => {
    component.ngOnInit();
    const titleControl = component.form.get('title');
    titleControl?.setValue('');

    const error = component.getErrorMessage('title');
    expect(error).toBe('');
  });

  it('deve retornar string vazia quando campo tem erro desconhecido', () => {
    component.ngOnInit();
    const titleControl = component.form.get('title');

    titleControl?.setErrors({ unknownError: true });
    titleControl?.markAsTouched();

    const error = component.getErrorMessage('title');
    expect(error).toBe('');
  });

  it('deve retornar false quando campo não tem erro', () => {
    component.ngOnInit();
    const titleControl = component.form.get('title');
    titleControl?.setValue('Valid Title');
    titleControl?.markAsTouched();

    const hasErr = component.hasError('title');
    expect(hasErr).toBe(false);
  });

  it('deve retornar true quando campo tem erro e foi tocado', () => {
    component.ngOnInit();
    const titleControl = component.form.get('title');
    titleControl?.setValue('');
    titleControl?.markAsTouched();

    const hasErr = component.hasError('title');
    expect(hasErr).toBe(true);
  });

  describe('Effect de sincronização do produto', () => {
    it('deve fazer patchValue quando produto existir e form estiver inicializado', () => {
      const customFixture = TestBed.createComponent(ProductFormComponent);
      const customComponent = customFixture.componentInstance;

      customFixture.componentRef.setInput('product', mockProduct);
      customFixture.detectChanges();

      customComponent.ngOnInit();

      expect(customComponent.form.get('title')?.value).toBe(mockProduct.title);
      expect(customComponent.form.get('price')?.value).toBe(mockProduct.price);
      expect(customComponent.form.get('description')?.value).toBe(mockProduct.description);
      expect(customComponent.form.get('category')?.value).toBe(mockProduct.category);
      expect(customComponent.form.get('image')?.value).toBe(mockProduct.image);
    });

    it('deve resetar form quando produto mudar para null', () => {
      const customFixture = TestBed.createComponent(ProductFormComponent);
      const customComponent = customFixture.componentInstance;

      customFixture.componentRef.setInput('product', mockProduct);
      customFixture.detectChanges();

      customComponent.ngOnInit();

      customComponent.form.patchValue({
        title: 'Different Value',
        price: 99,
        description: 'Different Description',
        category: 'different',
        image: 'https://different.com/image.jpg',
      });

      customFixture.componentRef.setInput('product', null);
      customFixture.detectChanges();

      expect(customComponent.form.get('title')?.value).toBeNull();
      expect(customComponent.form.get('price')?.value).toBeNull();
    });
  });
});
