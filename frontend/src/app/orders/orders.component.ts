import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  // orders: any = [
  //   {'order_id': 1, 'products': 'Cuban Caddy, Dr. Bombay Arm Band', 'date': '12/23/2016',
  //    'status': 'Order Placed'},
  //   {'order_id': 2, 'products': 'Dr. Bombay Arm Band', 'date': '6/14/2017',
  //    'status': 'Delivered'}
  // ];
  resText: string = '';
  orders: any = [];

  constructor(private slService: ShoppingListService, private userService: UserService,
  private router: Router) {
    //console.log(this.orders.length);
   }
  
  ngOnInit() {

    //Get Orders from server
    if(this.userService.getReturnUrl() == 'checkout'){
      this.resText = 'Order has been placed!';
    }

    this.slService.getOrders().subscribe(
      (response) => {
        //console.log("Get orders: " + response['orders']);
        // if(response['success']){
        //   let res = response['orders'];
        //   for (var index = 0; index < res.length; index++){
        //     console.log(res[index]);
        //     console.log(res[index]['order_id']);
        //   }
        // }
        if(response['success']){
          //console.log(response);
          let res = response['orders'];
          let dict = {};
          
          for (var index = 0; index < res.length; index++) {

            if(res[index]['order_id'] in dict){
              //dict[res[index['order_id']]].push(res[index]['product_id']);
              if(res[index]['product_id'] == 1){
                dict[res[index]['order_id']][res[index]['product_id']].push('Cuban Caddy ('+res[index]['quantity']+')' );
              }
              if(res[index]['product_id'] == 2){
                //console.log(dict);
                dict[res[index]['order_id']][res[index]['product_id']].push('Break 90 ('+res[index]['quantity']+') ');
              }
              //console.log("Ordercomponent product_id" + res[index]['product_id']);
            }
            
            else{
              //dict[res[index['order_id']]] = [res[index]['product_id']];
              dict[res[index]['order_id']] = {
                1:[],
                2:[],
                'date': '',
                'status': ''
              };
              // console.log("AFter 1 2"+ dict);
              // console.log(dict);
              if(res[index]['product_id'] == 1){
                //dict[res[index]['order_id']] = {};//res[index]['product_id'];
                dict[res[index]['order_id']][res[index]['product_id']] = [' Cuban Caddy ('+res[index]['quantity']+') '];
              }
              if(res[index]['product_id'] == 2){
                dict[res[index]['order_id']][res[index]['product_id']] = ['  Break 90 ('+res[index]['quantity']+') '];
              }
              //console.log(dict[res[index]['order_id']]);
              dict[res[index]['order_id']]['date'] = res[index]['date'];
              let status_code = res[index]['status'];
              let status = ''  
               switch (status_code) {
                 case 0:
                  status = 'Order Placed';
                   break;
                 case 1:
                  status = 'Order being processed';
                  break;
                 case 2:
                  status = 'Order has been shipped';
                  break;
                case 3:
                  status = 'Delivered';
                  break;
                 default:
                   break;
               }
               dict[res[index]['order_id']]['status'] = status;
            }           
          }
          //console.log(dict);

          for (var order_id in dict) {
            let temp = {};
            temp['order_id'] = order_id;
            let str = '';
            //console.log(dict[order_id][1][0]);
            if(dict[order_id][1].length > 0){    
              str += dict[order_id][1][0] + '  ';
            }
            //console.log(dict[order_id][2][0]);
            if(dict[order_id][2].length > 0){    
              str += dict[order_id][2][0];
            }
            temp['products'] = str;
            let temp_str = dict[order_id]['date'];
            temp['date'] = temp_str.slice(0, 10);
            temp['status'] = dict[order_id]['status'];

            this.orders.push(temp);
          }
          

          // for (var index = 0; index < res.length; index++) {
          //   let orderId = res[index]['order_id'];
          //   let products = dict[orderId];
          //   let date = res[index]['date'];
            
            
          //   //console.log(status_code);
               
                
          //   let temp = { 'order_id': orderId, 'products': products, 'date': date, 'status': status };
          //   this.orders.push(temp);
            
          // }
        }
      },
      (error) => console.log(error)
    );


  }

}
