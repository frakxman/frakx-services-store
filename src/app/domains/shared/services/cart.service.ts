import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environments';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly baseUrl: string = environment.baseUrl;

  private http = inject(HttpClient);

  cart = signal<Product[]>([]);
  prodsQuantity = computed(() => {
    const cart = this.cart();
    return cart.reduce((total, product) => total + product.quantity, 0);
  });
  total = computed(() => {
    const cart = this.cart();
    return cart.reduce( (total, product) => total + (product.price * product.quantity), 0 );
  });

  find(id: string) {
    return this.cart().find(product => product.id === id);
  }

  add(product: Product) {
    this.cart.update(state => {
      const existingProductIndex = state.findIndex(item => item.id === product.id)
      if (existingProductIndex !== -1) {
        const updatedCart = [...state];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1
        };
        return updatedCart;
      } else {
        return [...state, { ...product, quantity: 1 }];
      }
    });
  }

  decreaseQuantity(product: Product) {
    this.cart.update(state => {
      const existingProductIndex = state.findIndex(item => item.id === product.id);
      if (existingProductIndex !== -1) {
        const updatedCart = [...state];
        const newQuantity = updatedCart[existingProductIndex].quantity - 1;

        if (newQuantity <= 0) {
          updatedCart.splice(existingProductIndex, 1);
        } else {
          updatedCart[existingProductIndex] = {
            ...updatedCart[existingProductIndex],
            quantity: newQuantity
          };
        }

        return updatedCart;
      } else {
        return state;
      }
    });
  }

  removeProduct(product: Product) {
    this.cart.update(state => {
      const existingProductIndex = state.findIndex(item => item.id === product.id);
      if (existingProductIndex !== -1) {
        const updatedCart = [...state];
        updatedCart.splice(existingProductIndex, 1);
        return updatedCart;
      } else {
        return state;
      }
    });
  }

  updateQuantity(product: Product, quantity: number) {
    this.cart.update(state => state.map( p => p.id === product.id ? { ...p, quantity } : p ));
  }

  generateOrder(orderData: {user_id: string; products: {name: string; price: number; quantity: number;}[];}) {
    return this.http.post(`${this.baseUrl}/invoices`, orderData)
  }
}
