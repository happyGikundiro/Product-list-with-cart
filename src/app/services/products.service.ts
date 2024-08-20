import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private dataUrl = 'data/data.json'

  constructor(private http: HttpClient) { }

  getProducts():Observable<Products[]>{
    return this.http.get<Products[]>(this.dataUrl)
  }
}
