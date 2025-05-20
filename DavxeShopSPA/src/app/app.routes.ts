import { ExtraOptions, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ChatComponent } from './chat/chat.component';
import { FiltroComponent} from './filtro/filtro.component';
import { DetalleComponent } from './detalle/detalle.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarContrasenaComponent } from './pages/login/recuperar-contrasena/recuperar-contrasena.component';
import { ResetPasswordComponent } from './pages/login/reset-password/reset-password.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RegisterComponent } from './pages/register/register.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'recover-password', component: RecuperarContrasenaComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'my-products', component: MyProductsComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'add-product', component: AddProductComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'filtro', component: FiltroComponent },
    { path: 'detalle', component: DetalleComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];

export const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 0]
  };
