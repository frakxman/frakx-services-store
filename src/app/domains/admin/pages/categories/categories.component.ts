import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

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
  showModal = false;
  categoryToRemove!: Category;


  private categoryService = inject(CategoryService);
  private router = inject(Router);

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

  create() {
    this.router.navigate(['/admin/categories/create']);
  }

  edit(category: Category) {
    this.router.navigate([`/admin/categories/edit/${category.id}`]);
  }

  showConfirmationModal(category: Category) {
    this.categoryToRemove = category;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  remove(category: Category) {
    this.categoryService.remove(category.id!)
      .subscribe({
        next: () => {
          this.showModal = false;
          this.getCategories();
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}
