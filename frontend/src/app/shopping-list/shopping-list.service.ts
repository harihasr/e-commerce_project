import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Http, Response } from '@angular/http';

@Injectable()
export class ShoppingListService{
    productsChanged = new EventEmitter<any[]>();

    constructor(private authService: AuthService, private http: Http){}

    private products = [];

    getProducts(){
        return this.products.slice();
    }

    addProduct(productId: number, productName: string, quantity: any){
        this.products.push([productId, productName, quantity]);
        console.log(this.products);
        this.productsChanged.emit(this.products.slice());
    }

    setCart(products){
        this.products = products;
        this.productsChanged.next(this.products.slice());
    }

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