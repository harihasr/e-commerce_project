import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Http, Response, Headers } from '@angular/http';
import { ProductsModel } from '../products/products.model';

@Injectable()
export class ShoppingListService{
    //urlString: string = 'http://192.168.200.47:3000';
    urlString: string = 'http://localhost:3000';
    products: ProductsModel[] = [];

    constructor(private authService: AuthService, private http: Http){}
    //Get Products
    getProducts(){
        this.getFromServer().subscribe(
            (response) => {
                if(response['success']){
                    console.log("list servc");
                    let responses = response['cart'];
                    console.log(this.products.length);
                    this.products.length = 0;
                    for (var index = 0; index < responses.length; index++) {
                        var temp = new ProductsModel(responses[index]['product_id'], '',
                        responses[index]['quantity'], 1);
                        this.products.push(temp);
                        
                    }
                }
            },
            (error) => console.log(error)
        );
        return this.products.slice();
    }

    getFromServer(){
        var headers = new Headers();
        headers.append("Authorization", localStorage.getItem('token'));
        return this.http.get(this.urlString+'/cart', {headers: headers}).map(this.extractData);
    }

    extractData(res: Response){
        let body = res.json();
        return body;
    }

    //Add product to server

    addProduct(product_id: number, quantity: number){
        var headers = new Headers();
        headers.append("Authorization", localStorage.getItem('token'));
        return this.http.post(this.urlString+'/cart', {'product_id': product_id, 'quantity': quantity},
         {headers: headers}).map(this.extractData);
    }

    updateCart(product_id: number, quantity: number){
        var headers = new Headers();
        headers.append("Authorization", localStorage.getItem('token'));
        return this.http.put(this.urlString+'/cart', {'product_id': product_id, 'quantity': quantity},
         {headers: headers}).map(this.extractData);
    }

    deleteCart(product_id: number){
        var headers = new Headers();
        headers.append("Authorization", localStorage.getItem('token'));
        return this.http.delete(this.urlString+'/cart/'+product_id, {headers: headers});
    }
}