import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routerOptions, routes } from './app.routes';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './pages/chat/chat.component';
import { FiltroComponent} from './filtro/filtro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarContrasenaComponent } from './pages/login/recuperar-contrasena/recuperar-contrasena.component';
import { ResetPasswordComponent } from './pages/login/reset-password/reset-password.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RegisterComponent } from './pages/register/register.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SliderComponent } from './shared/slider/slider.component';
import { AddProductComponent } from './pages/my-products/add-product/add-product.component';
import { DetalleComponent } from './pages/my-products/detalle/detalle.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { ComprarComponent } from './pages/comprar/comprar.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { PagoComponent } from './pages/pago/pago.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    RecuperarContrasenaComponent,
    ResetPasswordComponent,
    SliderComponent,
    MyProductsComponent,
    AddProductComponent,
    ChatComponent,
    PerfilComponent,
    FiltroComponent,
    DetalleComponent,
    FooterComponent,
    DashboardComponent,
    SearchBarComponent,
    ComprarComponent,
    LoadingComponent,
    PagoComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, routerOptions),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
