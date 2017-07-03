import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { ProductsModel } from '../products/products.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  products: ProductsModel[] = [];

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.products = this.slService.getProducts();
    this.slService.productsChanged.subscribe(
      (products) => {
        this.products = products;
      }
    );
  }

  onInc(product_id){
    for (var index = 0; index < this.products.length; index++) {
        if(this.products[index]['product_id'] == product_id){
            this.products[index]['quantity'] += 1;
            
        }
    }
  }

  onDec(product_id){
    for (var index = 0; index < this.products.length; index++) {
        if(this.products[index]['product_id'] == product_id){
            this.products[index]['quantity'] -= 1;
        }
    }
  }

  deleteFromCart(product_id){
    for (var index = 0; index < this.products.length; index++) {
        if(this.products[index]['product_id'] == product_id){
            this.products[index]['quantity'] += 0;
            delete this.products[index];
        }
    }

  }

}
