import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { ProductsModel } from './products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

products = [
  {
    id: 1,
    name: "Cuban Caddy",
    shortDescription: "Some description of cuban caddy",
    cost: 15,
    imagePath: 'http://assets.academy.com/mgen/67/10265067.jpg?is=500,500',
    description: "Some longer description"
  },
  {
    id: 2,
    name: "Dr. Bombay Arm Band",
    shortDescription: "Some description of arm band",
    cost: 39,
    imagePath: 'https://www.tgw.com/wcsstore/CatalogAssetStore/Attachment/images/deptpage/accessories/DptThumb-GolfGloves.jpg',
    description: "Some longer description"
  }
];

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }
  
  addToCart(productid: number, productName: string, quantity: any, cost: number){
    //const temp = new ProductsModel(productid, productName, parseInt(quantity), cost)
    this.slService.addProduct(productid, productName, parseInt(quantity), cost);
  }

}
