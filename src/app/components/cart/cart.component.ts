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
  private cartClearedSubscription!: Subscription;

  constructor(private productService: ProductsService){}

  ngOnInit(): void {
    this.cartItems = this.productService.getCartItems();

    this.productService.cartCleared.subscribe(() => {
      this.cartItems = [];
    });
  }

  ngOnDestroy(): void {
    if (this.cartClearedSubscription) {
      this.cartClearedSubscription.unsubscribe();
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
