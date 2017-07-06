import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Ng2Webstorage } from 'ng2-webstorage';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AddressComponent } from './user/address/address.component';
import { AppRoutingModule } from './app.routing.module';

import { AuthService } from './auth/auth.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { UserService } from './user/user.service';
import { ErrorComponent } from './error/error.component';
import { OrdersComponent } from './orders/orders.component';
import { AddressEditComponent } from './user/address-edit/address-edit.component';
import { DropdownDirective } from './header/dropdown.directive';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderAdminComponent } from './order-admin/order-admin.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    SigninComponent,
    SignupComponent,
    ShoppingListComponent,
    ProfileComponent,
    AddressComponent,
    ErrorComponent,
    OrdersComponent,
    AddressEditComponent,
    DropdownDirective,
    CheckoutComponent,
    OrderAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2Webstorage
  ],
  providers: [AuthService, ShoppingListService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
