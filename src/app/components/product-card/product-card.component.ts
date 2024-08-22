import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Products } from '../../model/model';
import { ProductsService } from '../../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit, OnDestroy{

  @Input() product!: Products
  quantity:number = 0;
  private cartClearedSubscription!: Subscription;

  constructor(private productService: ProductsService){}

  ngOnInit(): void {
    this.quantity = this.productService.getItemQuantity(this.product)

    this.productService.cartCleared.subscribe(() => {
      this.quantity = 0;
  });
  }

  ngOnDestroy(): void {
    if (this.cartClearedSubscription) {
      this.cartClearedSubscription.unsubscribe();
    }
  }

  // addToCart() {
  //   this.productService.addToCart(this.product);
  //   this.quantity++;
  // }
  addToCart() {
    console.log('Product added:', this.product.name); // Check which product is being added
    this.productService.addToCart(this.product);
    this.quantity++;
    console.log('Current quantity:', this.quantity); // Verify the quantity updates
  }
  

  removeFromCart() {
    this.productService.removeFromCart(this.product);
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

}
