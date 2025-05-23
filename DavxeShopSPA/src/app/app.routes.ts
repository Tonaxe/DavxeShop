import { ExtraOptions, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { FiltroComponent} from './filtro/filtro.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarContrasenaComponent } from './pages/login/recuperar-contrasena/recuperar-contrasena.component';
import { ResetPasswordComponent } from './pages/login/reset-password/reset-password.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RegisterComponent } from './pages/register/register.component';
import { DetalleComponent } from './pages/my-products/detalle/detalle.component';
import { AddProductComponent } from './pages/my-products/add-product/add-product.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { ComprarComponent } from './pages/comprar/comprar.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { PagoComponent } from './pages/pago/pago.component';



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
    { path: 'detalle/:id', component: DetalleComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'search', component: SearchBarComponent },
    { path: 'comprar', component: ComprarComponent },
    { path: 'loading', component: LoadingComponent },
    { path: 'pagar', component: PagoComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full'}
];

export const routerOptions: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 0]
  };
