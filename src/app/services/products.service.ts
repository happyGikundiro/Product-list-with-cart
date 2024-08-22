import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private dataUrl = '/data/data.json'
  private cartItems: Products[] = [];
  cartCleared: EventEmitter<void> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getProducts():Observable<Products[]>{
    return this.http.get<Products[]>(this.dataUrl)
  }

  addToCart(product: Products){
    console.log('Adding to cart:', product.name);
    const existingProduct = this.cartItems.find(item => item.name === product.name)

    if(existingProduct){
      existingProduct.quantity = (existingProduct.quantity ?? 0) + 1;
    } else {
      this.cartItems.push({...product, quantity: 1})
    }
    console.log('Current cart items:', this.cartItems);
  }

  removeFromCart(product: Products) {
    const index = this.cartItems.findIndex(item => item.name === product.name);
    if (index !== -1 && this.cartItems[index]) {
      const existingProduct = this.cartItems[index];
      if (existingProduct.quantity && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else {
        this.cartItems.splice(index, 1);
      }
    }
  }

  removeAllFromCart(product: Products) {
    const index = this.cartItems.findIndex(item => item.name === product.name);
    if (index !== -1 && this.cartItems[index]) {
      const existingProduct = this.cartItems[index];
      if (existingProduct.quantity) {
        this.cartItems.splice(index, 1);
      } 
    }
  }

  getItemQuantity(product: Products): number {
    const item = this.cartItems.find(item => item.name === product.name);
    return item?.quantity ?? 0;
  }

  getCartItems(): Products[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
    console.log('Cart cleared:', this.cartItems);
    this.cartCleared.emit();
  }

}
