import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Http, Response } from '@angular/http';
import { ProductsModel } from '../products/products.model';

@Injectable()
export class ShoppingListService{
    productsChanged = new EventEmitter<any[]>();
    //urlString: string = 'http://192.168.200.47:3000';
    urlString: string = 'http://localhost:3000';
    constructor(private authService: AuthService, private http: Http){}

    products: ProductsModel[] = [];

    getProducts(){
        return this.products.slice();
    }

    addProduct(productId: number, productName: string, quantity: number, cost: number){
        if(this.products.length == 0){
            const temp = new ProductsModel(productId, productName, quantity, cost)
            this.products.push(temp);
        }
        else{
            var flag = 0;
            for (var index = 0; index < this.products.length; index++) {
                if(this.products[index]['product_id'] == productId){
                    this.products[index]['quantity'] += quantity;
                    flag = 1;
                }
            }
            if(flag == 0){
                const temp = new ProductsModel(productId, productName, quantity, cost)
                this.products.push(temp);
            }
        }
        // const temp = new ProductsModel(productId, productName, quantity, cost)
        // this.products.push(temp);
        //console.log(this.products.length); 
        //console.log(this.products[0]);
        this.productsChanged.emit(this.products.slice());
    }

    setCart(products){
        this.products = products;
        this.productsChanged.next(this.products.slice());
    }

    // updateCart(product: ProductsModel){
    //     this.http.put(this.urlString+'/addtocart/'+product['product_id'],{})
    // }

    pushToServer(productId: number, quantity: number, userId: number){
        this.http.post('http://localhost:3000/addtocart', [productId, quantity, userId]);
    }

    getFromServer(){
        this.http.get('http://localhost:3000/cart').subscribe(
        (response: Response) => {
            const products = response.json();
            this.setCart(products);
        });
    }
}