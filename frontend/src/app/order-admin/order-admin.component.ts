import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.css']
})
export class OrderAdminComponent implements OnInit {

  constructor( private slService: ShoppingListService ) { }

  orders: any = [
    {'order_id': 1, 'products': 'Cuban Caddy, Dr. Bombay Arm Band', 'date': '12/23/2016',
     'status': 'Order Placed'},
    {'order_id': 2, 'products': 'Dr. Bombay Arm Band', 'date': '6/14/2017',
     'status': 'Delivered'}
  ];

  ngOnInit() {
  }

  // selectItem(order_id: number, status_code: number){
  //   this.slService.putOrders(order_id, status_code).subscribe(
  //     (response) => {
  //       console.log("Put Orders from order-admin: "+response);
  //     },
  //     (error) => console.log(error)
  //   );
  // }

}
