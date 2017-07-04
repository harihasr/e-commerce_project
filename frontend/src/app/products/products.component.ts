import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { ProductsModel } from './products.model';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
resText: string = '';
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

  constructor(private slService: ShoppingListService, private authService: AuthService) { }

  ngOnInit() {
  }
  
  addToCart(productid: number, productName: string, quantity: any, cost: number){
    //const temp = new ProductsModel(productid, productName, parseInt(quantity), cost)
    // if(this.authService.isAuthenticated()){
    //   this.slService.pushToServer(productid, parseInt(quantity)).subscribe(
    //     (response) => {
    //       console.log(response)
    //       if(response['success']){
    //         this.resText = "Successfully added to cart";
    //       }
    //     },
    //     (error) => console.log(error)
    //   );
    // }
      // let temp = JSON.stringify({'product_id': productid, 'product_name': productName, 'quantity': quantity, 'cost': cost});
      // NgXCookies.setCookie('cart', temp);
    
      this.slService.addProduct(productid, parseInt(quantity)).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    
  }

}
