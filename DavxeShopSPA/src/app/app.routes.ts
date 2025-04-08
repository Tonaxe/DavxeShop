import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecuperarContrasenaComponent } from './login/recuperar-contrasena/recuperar-contrasena.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { AddProductComponent } from './add-product/add-product.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'recover-password', component: RecuperarContrasenaComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'my-products', component: MyProductsComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'add-product', component: AddProductComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
