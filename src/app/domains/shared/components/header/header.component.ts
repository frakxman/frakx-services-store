import { Component, OnInit, inject, signal } from '@angular/core';

import { Router, RouterLinkWithHref, RouterLinkActive } from '@angular/router';

import { AuthService } from '@auth/services/auth.service';
import { CartService } from '../../services/cart.service';

import { CommonModule } from '@angular/common';

import { TableComponent } from "../table/table.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [CommonModule, RouterLinkWithHref, RouterLinkActive, TableComponent]
})
export class HeaderComponent implements OnInit{

  private cartService = inject(CartService);
  private router = inject(Router);
  private authService = inject(AuthService);

  hideSideMenu = signal(true);
  prodsTotal = this.cartService.prodsQuantity;
  cart = this.cartService.cart;
  user = '';

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user?.name ?? '';
    });
  }

  toggleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }

  goToCart() {
    this.router.navigate(['/cart']);
    this.hideSideMenu.update(() => true);
  }

  logout() {
    localStorage.clear();
    this.user = '';
  }

}
