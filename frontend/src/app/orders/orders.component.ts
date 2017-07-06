import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any = [
    {'order_id': 1, 'products': 'Cuban Caddy, Dr. Bombay Arm Band', 'date': '12/23/2016',
     'status': 'Order Placed'},
    {'order_id': 2, 'products': 'Dr. Bombay Arm Band', 'date': '6/14/2017',
     'status': 'Delivered'}
  ];
  constructor(private slService: ShoppingListService) {
    console.log(this.orders.length);
   }
  
  ngOnInit() {


    //Get Orders from server

    // this.slService.getOrders().subscribe(
    //   (response) => {
    //     console.log("Get orders: " + response);
    //     if(response['success']){
    //       let res = response['orders'];
    //       for (var index = 0; index < res.length; index++) {
    //         let orderId = res[index]['order_id'];
    //         let products = res[index]['products'];
    //         let date = res[index]['date'];
    //         let status_code = res[index]['status'];
              //  let status = ''
              //  switch (status_code) {
              //    case 0:
              //     status = 'Order Placed';
              //      break;
              //    case 1:
              //     status = 'Order being processed';
              //     break;
              //    case 2:
              //     status = 'Order has been shipped';
              //     break;
              //   case 3:
              //     status = 'Delivered';
              //     break;
              //    default:
              //      break;
              //  }
    //         let temp = { 'order_id': orderId, 'products': products, 'date': date, 'status': status };
    //         this.orders.push(temp);
            
    //       }
    //     }
    //   },
    //   (error) => console.log(error)
    // );


  }

}
