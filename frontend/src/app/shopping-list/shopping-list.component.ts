import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { ProductsModel } from '../products/products.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  products: ProductsModel[] = [];
  total: number = 0;
  resText: string = 'Please signin to edit cart and place order';
  
  constructor(private slService: ShoppingListService,
   private authService: AuthService, private router: Router,
   private userService: UserService){}
  
  ngOnInit(){
    while(this.products.length > 0){
      this.products.pop();
    }
    this.products.length = 0;
    if(this.authService.isAuthenticated()){
      this.slService.getFromServer().subscribe(
      (response) => {
        if(response['success']){
            //console.log("list servc");
            let responses = response['cart'];
            //console.log(this.products.length);
            this.products.length = 0;
            for (var index = 0; index < responses.length; index++) {
                var temp = new ProductsModel(responses[index]['product_id'], '',
                responses[index]['quantity'], 1);
                this.products.push(temp);
            }
        }
          for (var index = 0; index < this.products.length; index++) {
          if(this.products[index]['product_id'] == 1){
            this.products[index]['product_name'] = 'Cuban Caddy';
            this.products[index]['cost'] = 15;
          }
          else if(this.products[index]['product_id'] == 2){
            this.products[index]['product_name'] = 'Break 90';
            this.products[index]['cost'] = 39;
          }
        }
        this.total = 0;
        for (var index = 0; index < this.products.length; index++) {
          this.total += this.products[index]['quantity']*this.products[index]['cost']; 
        }
        //console.log(this.total);
        },
        (error) => console.log(error)
      );
    }
    else{
      this.products = this.slService.getProducts();
      this.slService.productsChanged.subscribe(
        (products) => {
          this.products = products;
        }
      );
      for (var index = 0; index < this.products.length; index++) {
          if(this.products[index]['product_id'] == 1){
            this.products[index]['product_name'] = 'Cuban Caddy';
            this.products[index]['cost'] = 15;
          }
          else if(this.products[index]['product_id'] == 2){
            this.products[index]['product_name'] = 'Break 90';
            this.products[index]['cost'] = 39;
          }
        }
        this.total = 0;
        for (var index = 0; index < this.products.length; index++) {
            this.total += this.products[index]['quantity']*this.products[index]['cost']; 
          }
    }
  }

  onInc(product_id: number, quantity: number){
    if(this.authService.isAuthenticated()){
      for (var index = 0; index < this.products.length; index++) {
        if(this.products[index]['product_id'] == product_id){
            this.products[index]['quantity'] = this.products[index]['quantity'] + 1;
            
              this.slService.updateCart(product_id, quantity+1).subscribe(
                (response) => {
                  console.log(response);
                  if(response['success']){
                    this.router.navigate(['cart']);
                  }
                  this.total = 0;
                  for (var index = 0; index < this.products.length; index++) {
                    this.total += this.products[index]['quantity']*this.products[index]['cost']; 
                  }
                },
                (error) => console.log(error)
              );
            
              this.total = 0;
              for (var index = 0; index < this.products.length; index++) {
                  this.total += this.products[index]['quantity']*this.products[index]['cost']; 
              
              
            } 
        }
        
      }
    }
    else{
      for(var index = 0; index < this.products.length; index++){
        if(this.products[index]['product_id'] == product_id){
          //console.log(typeof(this.products[index]['quantity']));
            this.products[index]['quantity'] = this.products[index]['quantity'] + 1;
        }
      }
      // this.slService.setCart(this.products);
      // this.products.length = 0;
      // this.products = this.slService.incrementProduct(product_id);
      // this.total = 0;
      for (var index = 0; index < this.products.length; index++) {
        this.total += this.products[index]['quantity']*this.products[index]['cost'];
      }
    }
  }

  onDec(product_id, quantity){
    if(this.authService.isAuthenticated()){
      for (var index = 0; index < this.products.length; index++) {
        if(this.products[index]['product_id'] == product_id){
          if(quantity == 1){
            this.deleteFromCart(product_id);
          }
          else{
            this.products[index]['quantity'] -= 1;
            this.slService.updateCart(product_id, quantity - 1).subscribe(
              (response) => {
                console.log(response);
                if(response['success']){
                  this.router.navigate(['cart']);
                }
                this.total = 0;
                for (var index = 0; index < this.products.length; index++) {
                  this.total += this.products[index]['quantity']*this.products[index]['cost']; 
                }
              },
              (error) => console.log(error)
            );
          }
        }
      }
    }
    else{
      for(var index = 0; index < this.products.length; index++){
        if(this.products[index]['product_id'] == product_id){
          if(this.products[index]['quantity'] == 1){
            //this.slService.deleteProduct(product_id);
            delete this.products[index];
            this.router.navigate(['cart']);
          }
          else{
            this.products[index]['quantity'] -= 1;
            this.total = 0;
            for (var index = 0; index < this.products.length; index++) {
                  this.total += this.products[index]['quantity']*this.products[index]['cost']; 
            }
            // this.slService.setCart(this.products);
            // this.slService.productsChanged.subscribe(
            //   (products) => {
            //     this.products = products;
            //   }
            // );
          }
        }
      }
    }
    
  }

  deleteFromCart(product_id){

    for (var index = 0; index < this.products.length; index++) {
        if(this.products[index]['product_id'] == product_id){
            // this.products[index]['quantity'] += 0;
            // delete this.products[index];
            if(this.authService.isAuthenticated()){
              this.slService.deleteCart(product_id).subscribe(
                (response) => {
                  console.log(response);
                  if(response['success']){
                    this.router.navigate(['cart']);
                  }
                },
                (error) => console.log(error)
              );
            }
            else{
              // this.slService.deleteProduct(product_id);
              // this.slService.productsChanged.subscribe(
              //   (products) => {
              //     this.products = products;
              //   }
              // );
              delete this.products[index];
              this.slService.setCart(this.products);
              this.router.navigate(['cart']);
            }
        }
    }
  }

  onLogin(){
    this.userService.setReturnUrl('cart');
    this.slService.setCart(this.products);
    this.router.navigate(['signin']);
  }

  onRegister(){
    //this.userService.setReturnUrl('cart');
    this.slService.setCart(this.products);
    this.router.navigate(['signup']);
  }

  onCheckout(){
    this.userService.setTotal(this.total);
      this.slService.putProductsFromCart(this.products);
      this.router.navigate(['checkout']);
    
  }
}
