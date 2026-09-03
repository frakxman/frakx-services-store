import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '@env/environments';

import { Category } from '@shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly baseUrl: string = environment.baseUrl;

  private http = inject(HttpClient);

  constructor() { }

  getCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  getCategory(id: string) {
    return this.http.get<Category>(`${this.baseUrl}/categories/${id}`);
  }

  create(category: Omit<Category, 'id'>) {
    return this.http.post<Category>(
      `${this.baseUrl}/categories`,
      category
    );
  }

  update(id: string, category: Partial<Category>) {
    return this.http.patch<Category>(
      `${this.baseUrl}/categories/${id}`,
      category
    );
  }

  remove(id: string) {
    return this.http.delete<void>(
      `${this.baseUrl}/categories/${id}`
    );
  }

}
