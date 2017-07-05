import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AddressComponent } from './user/address/address.component';
import { ErrorComponent } from './error/error.component';
import { AddressEditComponent } from './user/address-edit/address-edit.component';
import { OrdersComponent } from './orders/orders.component';
import { CheckoutComponent } from './checkout/checkout.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full'},
    { path: 'products', component: ProductsComponent },
    { path: 'cart', component: ShoppingListComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'address', component: AddressComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'address-edit', component: AddressEditComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'checkout', component: CheckoutComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}