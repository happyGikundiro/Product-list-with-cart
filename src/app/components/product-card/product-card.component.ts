import { Component, Input, OnInit } from '@angular/core';
import { Products } from '../../model/model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit{

  @Input() product!: Products
  quantity:number = 0;

  constructor(private productService: ProductsService){}

  ngOnInit(): void {
    this.quantity = this.productService.getItemQuantity(this.product)
  }

  addToCart() {
    this.productService.addToCart(this.product);
    this.quantity++;
  }

  removeFromCart() {
    this.productService.removeFromCart(this.product);
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

}
