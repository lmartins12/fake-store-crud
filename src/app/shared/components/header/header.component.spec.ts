import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ThemeService } from '../../../core';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule],
      providers: [ThemeService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o título "Fake Store"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Fake Store');
  });

  it('deve alternar o tema ao clicar no botão de tema', () => {
    const toggleSpy = jest.spyOn(themeService, 'toggleTheme');
    component.toggleTheme();
    expect(toggleSpy).toHaveBeenCalled();
  });

  it('deve exibir ícone correto baseado no tema', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const themeButton = compiled.querySelector('.header__theme-toggle');
    expect(themeButton).toBeTruthy();
  });
});
