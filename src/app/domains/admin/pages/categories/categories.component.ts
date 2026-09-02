import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import { Category } from '@shared/models/category.model';
import { CategoryService } from '@shared/services/category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export default class CategoriesComponent {

  categories = signal<Category[]>([]);

  private categoryService = inject(CategoryService);

  ngOnInit() {
    this.getCategories();
  }

  private getCategories() {
    this.categoryService.getCategories()
      .subscribe({
        next: (categories) => {
          this.categories.set(categories);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}
