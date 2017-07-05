import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { AddressModel } from '../user/address/address.model';
import { UserModel } from '../user/user.model';
import { Router } from '@angular/router';
//import { Stripe } from 'stripe';
import { NgForm } from '@angular/forms';
declare var Stripe: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  addresses: AddressModel[] = [];
  user: UserModel;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  total: number;
  private cardToken:any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    //Address Get
    this.userService.getAddress().subscribe(
       (response) => {
        if(response['success']){
          var responses = response.address;
          for (var index = 0; index < responses.length; index++) {
            const temp = new AddressModel(responses[index]['address_id'], 
            responses[index]['address_line1'], responses[index]['address_line2'], 
            responses[index]['city'], responses[index]['state'], responses[index]['zip_code'], 
            responses[index]['phone']);
            this.addresses.push(temp);
          } 
          console.log(this.addresses);
          //Assuming the response is an array of objects. Has to be tested!
        }
      },
       (error) => console.log(error)
     );
     //Profile Get
     this.userService.getUser().subscribe(
      (response) => {
        if(response['success']){
          var res = response.user_details;
          this.user = new UserModel(res['first_name'], res['last_name'], res['email_id'], '');
        }
    },
      (error) => {console.log(error)}
    );
    this.total = this.userService.getTotal();
    this.setUpCard();
  }

  onAddAddress(){
    this.router.navigate(['address-edit']);
  } 

  onSelectAddress(address_id: number){

  } 

  onSubmit(form: NgForm){
    this.cardNumber = form.value.cardNumber;
    this.expiryMonth = form.value.expiryMonth;
    this.expiryYear = form.value.expiryYear;
    this.cvc = form.value.cvc;
    this.getCardToken(this.cardNumber, this.expiryMonth, this.expiryYear, this.cvc);
  }

  //Stripe Stuff
  setUpCard() {
    //here we setup the stripe publish key.
    //notice that this is a test key for my account so replace with production key(live)
    Stripe.setPublishableKey('pk_test_gB43t39GyV7GakrsgRaujvct');
  }

  // getCardData(number, month, year, cvc) {
  //   //I get the card data typed in here and pass it to the getCardToken method
  //   this.getCardToken(number, month, year, cvc);
  // }

  getCardToken(number, month, year, cvc) {
    //set up the card data as an object
    var dataObj = {"number": number, "exp_month": month, "exp_year": year, "cvc": cvc};

    // Request a token from Stripe:
    Stripe.card.createToken(dataObj,
      (status, response) => { 
        //console.log(response);//I'm using an arrow function instead of stripeResponseHandler(a function also) cos it's kickass!
        // basically you can do anything here with the reponse that has your token
        // you can hit your backend api and initialize a charge etc
        if (status === 200) {
          console.log("the card response: ", response);
          this.cardToken = response.id;
          console.log("the card token: ", this.cardToken);
          //Posting to URL
          this.userService.postCheckout(this.cardToken, this.user.email, this.total).subscribe(
            (response) => {
              console.log(response);
            },
            (error) => console.log(error)
          );
        }
        else {
          console.log("error in getting card data: ", response.error);
        }
      }
    );

  }

}
