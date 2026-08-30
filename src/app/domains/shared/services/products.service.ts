import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '@env/environments';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() {}

  getProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getOne(id: string) {
    console.log('Getting product with id:', id);
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  create(product: Product) {
    console.log('Creating product:', product);
    return this.http.post<Product>(`${this.baseUrl}/products`, product);
  }

  update(id: string, changes: Partial<Product>) {
    return this.http.patch<Product>(`${this.baseUrl}/products/${id}`, changes);
  }

  remove(id: string) {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }
}
