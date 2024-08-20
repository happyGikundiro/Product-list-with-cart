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

  constructor(private productService: ProductsService){}

  ngOnInit(): void {
    this.productSubscription = this.productService.getProducts().subscribe((data)=>{
      this.products = data;
      console.log(data)
    })
  }

  ngOnDestroy(): void {
    if(this.productSubscription){
      this.productSubscription.unsubscribe()
    }
  }
}
