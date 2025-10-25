import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    if (window.localStorage) {
      window.localStorage.clear();
    }
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    if (window.localStorage) {
      window.localStorage.clear();
    }
  });

  it('deve inicializar com tema light por padrão', () => {
    expect(service.theme()).toBe('light');
  });

  it('deve alternar entre light e dark', () => {
    service.toggleTheme();
    expect(service.theme()).toBe('dark');

    service.toggleTheme();
    expect(service.theme()).toBe('light');
  });

  it('deve definir tema específico', () => {
    service.setTheme('dark');
    expect(service.theme()).toBe('dark');

    service.setTheme('light');
    expect(service.theme()).toBe('light');
  });

  it('deve aplicar tema no head do documento', () => {
    const link = document.getElementById('prime-theme-link') as HTMLLinkElement;
    expect(link).toBeTruthy();
    expect(link.href).toContain('aura-light-noir');
  });

  it('deve manter o mesmo elemento de link ao atualizar', () => {
    const linkInicial = document.getElementById('prime-theme-link') as HTMLLinkElement;

    service.setTheme('dark');
    const linkAtualizado = document.getElementById('prime-theme-link') as HTMLLinkElement;

    expect(linkInicial).toBe(linkAtualizado);
  });

  it('deve restaurar tema do localStorage', () => {
    window.localStorage.setItem('fake-store-theme', 'dark');
    TestBed.resetTestingModule();
    service = TestBed.inject(ThemeService);

    expect(service.theme()).toBe('dark');
  });

  it('deve lidar com erro no localStorage', () => {
    Object.defineProperty(window, 'localStorage', {
      value: null,
      writable: true,
    });

    const newService = TestBed.inject(ThemeService);
    expect(newService.theme()).toBe('light');
  });

  it('deve lidar com tema quando não há localStorage', () => {
    Object.defineProperty(window, 'localStorage', {
      value: null,
      writable: true,
    });

    TestBed.resetTestingModule();
    const newService = TestBed.inject(ThemeService);

    expect(newService.theme()).toBe('light');
    newService.setTheme('dark');
    expect(newService.theme()).toBe('dark');
  });

  it('não deve atualizar href se o tema já está aplicado', () => {
    const link = document.getElementById('prime-theme-link') as HTMLLinkElement;
    const hrefInicial = link.href;

    service.setTheme('light');
    expect(link.href).toBe(hrefInicial);
  });

  it('deve ignorar tema inválido do localStorage', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    setItemSpy.mockImplementation(() => {});

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue('invalid'),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
        length: 0,
        key: jest.fn(),
      },
      writable: true,
    });

    TestBed.resetTestingModule();
    service = TestBed.inject(ThemeService);

    expect(service.theme()).toBe('light');
  });
});
