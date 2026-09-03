import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from '@shared/services/category.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export default class FormComponent {

  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = false;

  public categoryForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    image: ['', [Validators.required]]
  });

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) return;

    this.isEditMode = true;

    this.categoryService.getCategory(id).subscribe({
      next: (category) => {
        this.categoryForm.reset({
          ...category
        });
      },
      error: () => {
        this.router.navigate(['/admin/categories']);
      }
    });
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const { id, ...categoryWithoutId } = this.categoryForm.value;

    if (this.isEditMode && id) {
      this.categoryService.update(id, categoryWithoutId)
        .subscribe({
          next: () => {
            this.router.navigate(['/admin/categories']);
          },
          error: (error) => {
            console.error(error);
            alert('Error updating category');
          }
        });

      return;
    }

    this.categoryService.create(categoryWithoutId)
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/categories']);
        },
        error: (error) => {
          console.error(error);
          alert('Error creating category');
        }
      });
  }
}
