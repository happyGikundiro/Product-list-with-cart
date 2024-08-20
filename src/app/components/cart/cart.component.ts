import { Component, OnInit } from '@angular/core';
import { Products } from '../../model/model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  cartItems: Products[] = [];

  constructor(private productService: ProductsService){}

  ngOnInit(): void {
    this.cartItems = this.productService.getCartItems()
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
