import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
//holagit

export class HomeComponent implements OnInit {

  ngOnInit(): void {
  } 
  productosRandom = [
    "Producto 1", "Producto 2", "Producto 3", "Producto 4", "Producto 5",
    "Producto 6", "Producto 7", "Producto 8", "Producto 9", "Producto 10",
    "Producto 11", "Producto 12", "Producto 13", "Producto 14", "Producto 15",
    "Producto 16", "Producto 17", "Producto 18", "Producto 19", "Producto 20",
    "Producto 21", "Producto 22", "Producto 23", "Producto 24", "Producto 25",
    "Producto 26", "Producto 27", "Producto 28", "Producto 29", "Producto 30"
  ];
  @ViewChild('contenedor', { static: false }) contenedor!: ElementRef;
  productos = [
    { nombre: 'Producto 1', imagen: 'assets/logo.png' },
    { nombre: 'Producto 2', imagen: 'assets/logo.png' },
    { nombre: 'Producto 3', imagen: 'assets/logo.png' },
    { nombre: 'Producto 4', imagen: 'assets/logo.png' },
    { nombre: 'Producto 5s', imagen: 'assets/logo.png' },
   
  ];

  scrollLeft() {
    this.contenedor.nativeElement.scrollTo({ left: 0, behavior: 'smooth' });
  }

  scrollRight() {
    const maxScroll = this.contenedor.nativeElement.scrollWidth - this.contenedor.nativeElement.clientWidth;
    this.contenedor.nativeElement.scrollTo({ left: maxScroll, behavior: 'smooth' });
  }
}