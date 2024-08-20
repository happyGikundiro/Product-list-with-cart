import { Component, Input } from '@angular/core';
import { Products } from '../../model/model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product: Products = {
    image: {
      thumbnail: '',
      mobile: '',
      tablet: '',
      desktop: ''
    },
    category:'',
    name:'',
    price:0
  }

}
