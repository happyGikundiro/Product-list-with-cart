import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../model/model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{

  products: Products[] = [];
  productSubscription!: Subscription;
  cartItems: Products[] = [];

  showModal: boolean = false; 

  constructor(private productService: ProductsService){}

  ngOnInit(): void {
    this.productSubscription = this.productService.getProducts().subscribe((data)=>{
      this.products = data;
    })
  }

  ngOnDestroy(): void {
    if(this.productSubscription){
      this.productSubscription.unsubscribe()
    }
  }

  onOrderConfirm(cartItems: Products[]) {
    this.cartItems = cartItems;
    this.showModal = true;
  }

  getTotalPrice(): string {
    let total = 0;
    for (const item of this.cartItems) {
      total += (item.quantity ?? 0) * item.price;
    }
    return total.toFixed(2);
  }

  closeModal() {
    this.showModal = false;
    this.productService.clearCart();
  }

  
}
