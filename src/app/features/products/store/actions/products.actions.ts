import { IProduct } from '@core/index';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    'Load Products': emptyProps(),
    'Load Products Success': props<{ products: IProduct[] }>(),
    'Load Products Failure': props<{ error: string }>(),

    'Create Product': props<{ product: Omit<IProduct, 'id'> }>(),
    'Create Product Success': props<{ product: IProduct }>(),
    'Create Product Failure': props<{ error: string }>(),

    'Update Product': props<{ id: number; product: IProduct }>(),
    'Update Product Success': props<{ product: IProduct }>(),
    'Update Product Failure': props<{ error: string }>(),

    'Delete Product': props<{ id: number }>(),
    'Delete Product Success': props<{ id: number }>(),
    'Delete Product Failure': props<{ error: string }>(),

    'Set Selected Product': props<{ product: IProduct | null }>(),
    'Clear Selected Product': emptyProps(),
    'Clear Error': emptyProps(),
  },
});
