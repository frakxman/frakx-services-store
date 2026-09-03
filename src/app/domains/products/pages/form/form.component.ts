import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { Product } from '@shared/models/product.model';
import { Category } from '@shared/models/category.model';
import { ProductsService } from '@shared/services/products.service';
import { CategoryService } from '@shared/services/category.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export default class FormComponent {

  private fb = inject( FormBuilder );
  private productService = inject(ProductsService);
  private categoryService = inject(CategoryService);
  private activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  categs = signal<Category[]>([]);

  product: Product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    images: [],
    quantity: 0,
    stock: 0
  };

  prods = signal<Product[]>([]);

  public productForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(1)]],
    quantity: [0],
    stock: ['', [Validators.required]],
    status: [true],
    categoryId: [''],
  });

  isEditMode = false;

  ngOnInit() {
  this.getProducts();
  this.getCategories();

  const id = this.activatedRoute.snapshot.paramMap.get('id');

  if (!id) return;

  this.isEditMode = true;

  this.productService.getOne(id).subscribe({
    next: (product) => {
      this.productForm.reset({
        ...product
      });
    },
    error: () => this.router.navigate(['/admin/products'])
  });
}


  get currentProduct() {
    const product = this.productForm.value as Product;
    return product;
  }

  private getProducts() {
    this.productService.getProducts()
      .subscribe({
        next: (products) => {
          this.prods.set(products);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  private getCategories() {
    this.categoryService.getCategories()
      .subscribe({
        next: (categories) => {
          this.categs.set(categories);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  onSubmit() {

    if (this.productForm.invalid) return;

    // To edit a product
    if (this.currentProduct.id) {
      const { id, ...productWithoutId } = this.productForm.value;
      this.productService.update(this.currentProduct.id, productWithoutId)
        .subscribe({
          next: (product) => {
            const index = this.prods().findIndex(p => p.id === product.id);
            this.prods.update(state => {
              state[index] = product;
              this.router.navigate(['/admin/products']);
              return state;
            });
            console.log('Product updated', product);
          },
          error: (e) => alert('Error updating product')
        });
      return;
    }

    // To create a product
    const defaultImage = 'https://picsum.photos/640/640?r=' + Math.random();

    const product = {
      ...this.productForm.value,
      quantity: 1,
    };

    delete product.id;

    if (!product.images || product.images.length === 0) {
      product.images = [defaultImage];
    }

    this.productService.create(product)
      .subscribe({
        next: (product) => {
          this.prods.update(state => [...state, product]);
          console.log('Product created', product);
          this.router.navigate(['/admin/products']);
          this.productForm.reset();
        },
        error: (e) => alert('Error creating product')
      });
  }
}
