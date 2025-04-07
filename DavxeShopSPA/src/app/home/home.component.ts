import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  ngOnInit(): void {
  } 
  @ViewChild('contenedor', { static: false }) contenedor!: ElementRef;
  productos = [
    { nombre: 'Producto 1', imagen: 'assets/logo.png' },
    { nombre: 'Producto 2', imagen: 'assets/logo.png' },
    { nombre: 'Producto 3', imagen: 'assets/logo.png' },
  ];

  scrollLeft() {
    this.contenedor.nativeElement.scrollTo({ left: 0, behavior: 'smooth' });
  }
  
  scrollRight() {
    const maxScroll = this.contenedor.nativeElement.scrollWidth - this.contenedor.nativeElement.clientWidth;
    this.contenedor.nativeElement.scrollTo({ left: maxScroll, behavior: 'smooth' });
  }  
}