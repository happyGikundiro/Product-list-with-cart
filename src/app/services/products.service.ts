import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, catchError, throwError } from 'rxjs';
import { Products } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private dataUrl = '/data/data.json'
  private cartItems: Products[] = [];
  private cartSubject = new BehaviorSubject<Products[]>([]);

  cartChanges$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) { }

  getProducts():Observable<Products[]>{
    return this.http.get<Products[]>(this.dataUrl).pipe(
      catchError(this.handleError)
    );
  }

  addToCart(product: Products){
    const existingProduct = this.cartItems.find(item => item.name === product.name)

    if(existingProduct){
      existingProduct.quantity = (existingProduct.quantity ?? 0) + 1;
    } else {
      this.cartItems.push({...product, quantity: 1})
    }

    this.cartSubject.next(this.cartItems);
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
    this.cartSubject.next(this.cartItems);
  }

  removeAllFromCart(product: Products) {
    const index = this.cartItems.findIndex(item => item.name === product.name);
    if (index !== -1 && this.cartItems[index]) {
      const existingProduct = this.cartItems[index];
      if (existingProduct.quantity) {
        this.cartItems.splice(index, 1);
      } 
    }
    this.cartSubject.next(this.cartItems);
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
    this.cartSubject.next(this.cartItems);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong with the request'));
  }
  
}
