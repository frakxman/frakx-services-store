import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';

import { TableComponent } from "@shared/components/table/table.component";
import { CustomerDataComponent } from "../../components/customer-data/customer-data.component";

import { CartService } from '@shared/services/cart.service';
import { AuthService } from '@auth/services/auth.service';

import { PayMethodsComponent } from "../../components/pay-methods/pay-methods.component";

import { Customer, Order, Payment } from '@shared/models/order.model';

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: [CommonModule, RouterLinkWithHref, TableComponent, CustomerDataComponent, PayMethodsComponent]
})
export default class CartComponent implements OnInit  {

  router = inject(Router);
  private cartService = inject(CartService);
  private authService = inject(AuthService);

  cart = this.cartService.cart;
  total = this.cartService.total;
  logged = false;
  showModal = false;
  step = 0;
  userId = '';
  locationData!: Customer;
  payMethodData!: Payment;
  orderData!: Order;
  confirmationModal = false;
  orderNumber = Math.floor(Math.random() * 10000);


  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.userId = user?.id ?? '';
    });
    this.logged = !!this.userId;
  }

  userConfirm() {
    this.router.navigate(['/auth/login']);
  }

  onLocation(data: any) {
    console.log(data)
    this.locationData = data;
    this.step++;
  }

  onPayMethod(data: any) {
    console.log(data)
    this.showModal = true;

    this.orderData = {
      locationData: this.locationData,
      payMethodData: data,
      products: this.cart(),
      total: this.total()
    };
  }

  closeModal() {
    this.showModal = false;
  }

  confirmOrder() {
    const orderData = {
      userId: this.userId,
      date: new Date(),
      products: this.cart().map(product => product.id),
    };
    console.log('Order generated', orderData);

    this.cartService.generateOrder(orderData)
      .subscribe({
        next: () => {
          this.confirmationModal = true;
        },
        error: () => alert('Error generating order')
      });
  }

  closeConfirmationModal() {
    this.cartService.cart.set([]);
    this.router.navigate(['/']);
    this.confirmationModal = false;
  }
}
