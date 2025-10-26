import { Directive, input, output } from '@angular/core';
import { IProduct } from '@core/index';

/**
 * @description Componente base abstrato para listagem de produtos
 * Contém lógica compartilhada entre ProductTable e ProductCatalog
 *
 * @abstract
 */
@Directive()
export abstract class BaseProductListComponent {
  private readonly SKELETON_ITEMS_COUNT = 6 as const;

  public readonly products = input<IProduct[]>([]);
  public readonly loading = input<boolean>(false);

  public readonly view = output<IProduct>();
  public readonly edit = output<IProduct>();
  public readonly delete = output<IProduct>();

  public readonly skeletonItems = Array(this.SKELETON_ITEMS_COUNT).fill(0);

  public onView(product: IProduct): void {
    this.view.emit(product);
  }

  public onEdit(product: IProduct): void {
    this.edit.emit(product);
  }

  public onDelete(product: IProduct): void {
    this.delete.emit(product);
  }

  /**
   * @description Esconde a imagem quebrada e mostra fallback
   * @param event - Evento de erro da imagem
   */
  public onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    const fallbackElement = imgElement.nextElementSibling as HTMLElement;

    if (imgElement && fallbackElement) {
      imgElement.style.display = 'none';
      fallbackElement.style.display = 'flex';
    }
  }
}
