import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.css']
})
export class OrderAdminComponent implements OnInit {

  constructor( private slService: ShoppingListService ) { }

  // orders: any = [
  //   {'order_id': 1, 'products': 'Cuban Caddy, Dr. Bombay Arm Band', 'date': '12/23/2016',
  //    'status': 'Order Placed'},
  //   {'order_id': 2, 'products': 'Dr. Bombay Arm Band', 'date': '6/14/2017',
  //    'status': 'Delivered'}
  // ];

  orders: any = [];

  ngOnInit() {
    this.slService.getAdminOrders().subscribe(
      (response) => {
        if(response['success']){
          console.log(response);
          let res = response['orders'];
          let dict = {};
          
          for (var index = 0; index < res.length; index++) {

            if(res[index]['order_id'] in dict){
              if(res[index]['product_id'] == 1){
                dict[res[index]['order_id']][res[index]['product_id']].push('Cuban Caddy ('+res[index]['quantity']+')' );
              }
              if(res[index]['product_id'] == 2){
                //console.log(dict);
                dict[res[index]['order_id']][res[index]['product_id']].push('Break 90 ('+res[index]['quantity']+') ');
              }
            }
            
            else{
              dict[res[index]['order_id']] = {
                1:[],
                2:[],
                'date': '',
                'status': '',
                'address_line1': '',
                'address_line2': '',
                'city': ''
              };
              if(res[index]['product_id'] == 1){
                dict[res[index]['order_id']][res[index]['product_id']] = [' Cuban Caddy ('+res[index]['quantity']+') '];
              }
              if(res[index]['product_id'] == 2){
                dict[res[index]['order_id']][res[index]['product_id']] = ['  Break 90 ('+res[index]['quantity']+') '];
              }
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
               dict[res[index]['order_id']]['address_line1'] = res[index]['address_line1'];
               dict[res[index]['order_id']]['address_line2'] = res[index]['address_line2'];
               dict[res[index]['order_id']]['city'] = res[index]['city'];
            }           
          }
          for (var order_id in dict) {
            let temp = {};
            temp['order_id'] = order_id;
            let str = '';
            if(dict[order_id][1].length > 0){    
              str += dict[order_id][1][0] + '  ';
            }
            if(dict[order_id][2].length > 0){    
              str += dict[order_id][2][0];
            }
            temp['products'] = str;
            let temp_str = dict[order_id]['date'];
            temp['date'] = temp_str.slice(0, 10);
            temp['status'] = dict[order_id]['status'];
            temp['address_line1'] = dict[order_id]['address_line1'];
            temp['address_line2'] = dict[order_id]['address_line2'];
            temp['city'] = dict[order_id]['city'];
            this.orders.push(temp);
          }
        }
      },
      (error) => console.log(error)
    );
  }

  selectItem(order_id: number, status_code: number){
    this.slService.putOrders(order_id, status_code).subscribe(
      (response) => {
        console.log("Put Orders from order-admin: "+response);
      },
      (error) => console.log(error)
    );
  }
}
