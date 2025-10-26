import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IProduct } from '../interfaces/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/products`;

  public getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  public getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  }

  public createProduct(product: Omit<IProduct, 'id'>): Observable<IProduct> {
    return this.http.post<IProduct>(this.apiUrl, product);
  }

  public updateProduct(id: number, product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.apiUrl}/${id}`, product);
  }

  public deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
