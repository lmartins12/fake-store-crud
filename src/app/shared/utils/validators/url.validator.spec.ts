import { FormControl } from '@angular/forms';
import { urlValidator } from './url.validator';

describe('urlValidator', () => {
  let validator: ReturnType<typeof urlValidator>;

  beforeEach(() => {
    validator = urlValidator();
  });

  describe('URLs válidas', () => {
    it('deve aceitar URL com protocolo https', () => {
      const control = new FormControl('https://www.example.com');
      const result = validator(control);
      expect(result).toBeNull();
    });

    it('deve aceitar URL com protocolo http', () => {
      const control = new FormControl('http://www.example.com');
      const result = validator(control);
      expect(result).toBeNull();
    });

    it('deve aceitar URL sem protocolo', () => {
      const control = new FormControl('www.example.com');
      const result = validator(control);
      expect(result).toBeNull();
    });
  });

  describe('URLs inválidas', () => {
    it('deve rejeitar URL sem domínio', () => {
      const control = new FormControl('https://');
      const result = validator(control);
      expect(result).toEqual({ invalidUrl: true });
    });

    it('deve rejeitar URL sem extensão de domínio', () => {
      const control = new FormControl('https://example');
      const result = validator(control);
      expect(result).toEqual({ invalidUrl: true });
    });

    it('deve rejeitar texto sem formato de URL', () => {
      const control = new FormControl('not a url');
      const result = validator(control);
      expect(result).toEqual({ invalidUrl: true });
    });

    it('deve rejeitar URL com protocolo inválido', () => {
      const control = new FormControl('ftp://example.com');
      const result = validator(control);
      expect(result).toEqual({ invalidUrl: true });
    });
  });

  describe('Valores vazios ou nulos', () => {
    it('deve aceitar valor vazio', () => {
      const control = new FormControl('');
      const result = validator(control);
      expect(result).toBeNull();
    });

    it('deve aceitar valor null', () => {
      const control = new FormControl(null);
      const result = validator(control);
      expect(result).toBeNull();
    });

    it('deve aceitar valor undefined', () => {
      const control = new FormControl(undefined);
      const result = validator(control);
      expect(result).toBeNull();
    });
  });
});
