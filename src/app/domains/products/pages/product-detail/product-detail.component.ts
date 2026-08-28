import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '@shared/models/product.model';

import { CartService } from '@shared/services/cart.service';
import { ProductsService } from '@shared/services/products.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export default class ProductDetailComponent {

  @Input() id?: string;

  product = signal<Product | null>(null);
  cover = signal('');

  private productService = inject(ProductsService);
  private cartService = inject(CartService);

  ngOnInit() {
    console.log('Product id', this.id);
    if (this.id) {
      this.productService.getOne(this.id)
      .subscribe({
        next: (product) => {
          this.product.set(product);
          this.cover.set(product.images?.[0] ?? '@assets/images/no-image.png');
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }

  changeCover(newImage: string) {
    this.cover.set(newImage);
  }

  addToCart() {
    const product = this.product();
    if (product) {
      this.cartService.add(product);
    }
  }
}
