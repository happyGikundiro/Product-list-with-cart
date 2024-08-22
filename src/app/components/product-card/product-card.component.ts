
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../model/model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product!: Products;
  quantity: number = 0;
  private cartSubscription!: Subscription;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.updateQuantity();
    this.cartSubscription = this.productService.cartChanges$.subscribe({
      next: () => this.updateQuantity(),
      error: (error) => console.error('Failed to update cart quantity', error)
    });
  }

  ngOnDestroy(): void {
    if(this.cartSubscription){
    this.cartSubscription.unsubscribe();
    }
  }

  updateQuantity() {
    this.quantity = this.productService.getItemQuantity(this.product);
  }

  addToCart() {
    this.productService.addToCart(this.product);
    this.updateQuantity();
  }

  removeFromCart() {
    this.productService.removeFromCart(this.product);
    this.updateQuantity();
  }

  isInCart(): boolean {
    return this.quantity > 0;
  }
}

