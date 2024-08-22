import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Products } from '../../model/model';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy{

  cartItems: Products[] = [];
  @Output() confirmOrder = new EventEmitter<Products[]>();
  cartSubscription!: Subscription

  constructor(private productService: ProductsService){}

  ngOnInit(): void {
    this.cartSubscription = this.productService.cartChanges$.subscribe({
      next: (cartItems) => this.cartItems = cartItems,
      error: (error) => console.error('Failed to load cart items', error)
    });
  }
  
  ngOnDestroy(): void {
    if(this.cartSubscription){
      this.cartSubscription.unsubscribe()
    }
  }

  getTotalPrice(): string {
    let total = 0;
    for (const item of this.cartItems) {
      total += (item.quantity ?? 0) * item.price;
    }
    return total.toFixed(2);
  }
  

  removeFromCart(product: Products) {
    this.productService.removeAllFromCart(product);
    this.cartItems = this.productService.getCartItems();
  }

  onConfirmOrder() {
    this.confirmOrder.emit(this.cartItems);
  }
  
}
