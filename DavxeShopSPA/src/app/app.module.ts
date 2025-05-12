import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routerOptions, routes } from './app.routes';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RecuperarContrasenaComponent } from './login/recuperar-contrasena/recuperar-contrasena.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { SliderComponent } from './slider/slider.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ChatComponent } from './chat/chat.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FiltroComponent} from './filtro/filtro.component';
import { DetalleComponent } from './detalle/detalle.component';
import { FooterComponent } from './footer/footer.component';

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
    FooterComponent
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
