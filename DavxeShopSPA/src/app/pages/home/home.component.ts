import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nombreUsuario: string = "Tonaxe";
  dropdownAbierto: boolean = false;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);

      this.apiService.getUserById(decoded.userId).subscribe(
        (res) => {
          sessionStorage.setItem('user', JSON.stringify(res));
          console.log(sessionStorage.getItem("user"));
          this.router.navigate(["/home"]);
        },
        (error) => {
        }
      );
    }
  }

  
  categoriasPrincipales = [
    { id: 'coche', nombre: 'Coche' },
    { id: 'moto', nombre: 'Moto' },
    { id: 'motor', nombre: 'Motor' },
    { id: 'hogar', nombre: 'Hogar' }
  ];

  categoriasSecundarias = [
    { id: 'moda', nombre: 'Moda' },
    { id: 'inmobiliaria', nombre: 'Inmobiliaria' },
    { id: 'gym', nombre: 'Gym' },
    { id: 'tecnologia', nombre: 'Tecnología' },
    { id: 'accesorios', nombre: 'Accesorios' }
  ];

  @ViewChild('contenedor', { static: false }) contenedor!: ElementRef;
  
  productos = [
    { nombre: 'Producto 1', imagen: 'assets/1.png' },
    { nombre: 'Producto 2', imagen: 'assets/1.png' },
    { nombre: 'Producto 3', imagen: 'assets/1.png' },
    { nombre: 'Producto 4', imagen: 'assets/1.png' },
    { nombre: 'Producto 5', imagen: 'assets/1.png' },
    { nombre: 'Producto 6', imagen: 'assets/1.png' },
    { nombre: 'Producto 7', imagen: 'assets/1.png' },
    { nombre: 'Producto 8', imagen: 'assets/1.png' },
    { nombre: 'Producto 9', imagen: 'assets/1.png' },
    { nombre: 'Producto 10', imagen: 'assets/1.png' },
    { nombre: 'Producto 11', imagen: 'assets/1.png' },
    { nombre: 'Producto 12', imagen: 'assets/1.png' },
    { nombre: 'Producto 13', imagen: 'assets/1.png' },
    { nombre: 'Producto 14', imagen: 'assets/1.png' },
    { nombre: 'Producto 15', imagen: 'assets/1.png' },
  ];

  productosRandom = [
    "Producto 1", "Producto 2", "Producto 3", "Producto 4", "Producto 5",
    "Producto 6", "Producto 7", "Producto 8", "Producto 9", "Producto 10",
    "Producto 11", "Producto 12", "Producto 13", "Producto 14", "Producto 15",
    "Producto 16", "Producto 17", "Producto 18", "Producto 19", "Producto 20"
  ];

  scrollLeft() {
    this.contenedor.nativeElement.scrollBy({ 
      left: -300, 
      behavior: 'smooth' 
    });
  }

  scrollRight() {
    this.contenedor.nativeElement.scrollBy({ 
      left: 300, 
      behavior: 'smooth' 
    });
  }

  verDetalle(producto: any) {
    this.router.navigate(['/detalle'], { 
      state: { producto: producto }
    });
  }

  toggleDropdown() {
    this.dropdownAbierto = !this.dropdownAbierto;
  }
}

function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}
