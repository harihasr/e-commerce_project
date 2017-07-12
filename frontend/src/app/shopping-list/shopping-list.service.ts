import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Http, Response, Headers } from '@angular/http';
import { ProductsModel } from '../products/products.model';
import { EventEmitter } from '@angular/core';

@Injectable()
export class ShoppingListService{
    productsChanged = new EventEmitter<any[]>();
    urlString: string = 'http://192.168.200.47:3000';
    //urlString: string = 'http://localhost:3000';
    products: ProductsModel[] = [];
    productsFromCart: ProductsModel[] = [];
    

    constructor(private authService: AuthService, private http: Http){}
    //When user is not authenticated
    getProducts(){
        // this.getFromServer().subscribe(
        //     (response) => {
        //         if(response['success']){
        //             console.log("list servc");
        //             let responses = response['cart'];
        //             console.log(this.products.length);
        //             this.products.length = 0;
        //             for (var index = 0; index < responses.length; index++) {
        //                 var temp = new ProductsModel(responses[index]['product_id'], '',
        //                 responses[index]['quantity'], 1);
        //                 this.products.push(temp);
                        
        //             }
        //         }
        //     },
        //     (error) => console.log(error)
        // );
        return this.products.slice();
    }


    
    putProduct(product_id: number, quantity: number){
        if(this.products.length == 0){
                const temp = new ProductsModel(product_id, '', quantity, 1)
                this.products.push(temp);
            }
            else{
                var flag = 0;
                for (var index = 0; index < this.products.length; index++) {
                    if(this.products[index]['product_id'] == product_id){
                        this.products[index]['quantity'] += quantity;
                        flag = 1;
                    }
                }
                if(flag == 0){
                    const temp = new ProductsModel(product_id, '', quantity, 1);
                    this.products.push(temp);
                }
                this.productsChanged.emit(this.products.slice());
            }
    }

    deleteProduct(productId: number){
        for (var index = 0; index < this.products.length; index++) {
            if(this.products[index]['product_id'] == productId){
            // this.products[index]['quantity'] += 0;
                delete this.products[index];
            }
        }
        this.productsChanged.emit(this.products.slice());
    }

    incrementProduct(product_id: number){
        for (var index = 0; index < this.products.length; index++) {
            if(this.products[index]['product_id'] == product_id){
                this.products[index]['quantity'] += 1;
            }
        }
        return this.products.slice();
    }

    setCart(products: ProductsModel[]){
        this.products = products;
        this.productsChanged.emit(this.products.slice());
    }

    
    extractData(res: Response){
        let body = res.json();
        return body;
    }

    onLoggedIn(){
        if(this.products.length > 0){
            
            for (var index = 0; index < this.products.length; index++) {
                this.addProduct(this.products[index]['product_id'], this.products[index]['quantity']).
                subscribe(
                    (response) => {
                        console.log('onLoggedIn, slService: '+response);
                    },
                    (error) => console.log(error)
                );
            }
        }
    }

    getFromServer(){
        var headers = new Headers();
        headers.append("Authorization", localStorage.getItem('token'));
        return this.http.get(this.urlString+'/cart', {headers: headers}).map(this.extractData);
    }

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

    //Orders

    getOrders(){
        var headers = new Headers();
        headers.append("Authorization", localStorage.getItem('token'));
        return this.http.get(this.urlString+'/user/orders', {headers: headers}).map(this.extractData);
    }

    putOrders(orderId: number, status: number){
        var headers = new Headers();
        headers.append("Authorization", localStorage.getItem('token'));
        return this.http.put(this.urlString+'/admin/orders', {'order_id': orderId, 'status': status},
         {headers: headers}).map(this.extractData);
    }

    getAdminOrders(){
        var headers = new Headers();
        headers.append("Authorization", localStorage.getItem('token'));
        return this.http.get(this.urlString+'/admin/orders', {headers: headers}).map(this.extractData);
    }

    getProductsFromCart(){
        return this.productsFromCart.slice();
    }

    putProductsFromCart(products: ProductsModel[]){
        this.productsFromCart = products;
    }

}