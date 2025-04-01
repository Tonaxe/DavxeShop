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
    'Producto 1', 'Producto 2', 'Producto 3', 'Producto 4', 'Producto 5',
    'Producto 6', 'Producto 7', 'Producto 8', 'Producto 9', 'Producto 10'
  ];

  scrollLeft() {
    this.contenedor.nativeElement.scrollTo({ left: 0, behavior: 'smooth' });
  }
  
  scrollRight() {
    const maxScroll = this.contenedor.nativeElement.scrollWidth - this.contenedor.nativeElement.clientWidth;
    this.contenedor.nativeElement.scrollTo({ left: maxScroll, behavior: 'smooth' });
  }
  
  
}