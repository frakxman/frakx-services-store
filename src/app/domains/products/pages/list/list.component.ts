import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';

import { RouterLinkWithHref } from '@angular/router';

// Components imports
import { ProductComponent } from '@products/components/product/product.component';

// Modules imports
import { Category } from '@shared/models/category.model';
import { Product } from '@shared/models/product.model';

// Services imports
import { CartService } from '@shared/services/cart.service';
import { CategoryService } from '@shared/services/category.service';
import { ProductsService } from '@shared/services/products.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {

  allProds = signal<Product[]>([]);
  categs = signal<Category[]>([]);
  selectedCategoryId = signal<string | null>(null);

  prods = computed(() => {
    const selected = this.selectedCategoryId();
    const all = this.allProds();
    if (!selected) return all;
    return all.filter(product => product.categoryId?.id === selected);
  });

  private cartService = inject(CartService);
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoryService);

  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }

  addToCart( product: Product ) {
    this.cartService.add(product);
  }

  selectCategory(categoryId: string | null) {
    this.selectedCategoryId.set(categoryId);
  }

  private getProducts() {
    this.productsService.getProducts()
      .subscribe({
        next: (products) => {
          this.allProds.set(products);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  private getCategories() {
    this.categoriesService.getCategories()
      .subscribe({
        next: (categories) => {
          this.categs.set(categories);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}
