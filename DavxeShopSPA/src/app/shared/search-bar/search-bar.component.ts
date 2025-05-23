import { Component, ElementRef, HostListener } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  query: string = '';
  resultados: any[] = [];

  constructor(private apiService: ApiService, private router: Router, private elRef: ElementRef) {}

  onInputChange(): void {
    const q = this.query.trim();
    if (q.length === 0) {
      this.resultados = [];
      return;
    }

    this.apiService.getSearchedProducts(q).subscribe({
      next: (res) => {
        this.resultados = res.productos ?? [];
      },
      error: (err) => {
        console.error('Error buscando productos:', err);
        this.resultados = [];
      }
    });
  }

  selectResult(producto: any) {
    this.query = producto.nombre;
    this.resultados = [];
    this.irAFiltro(this.query);
  }

  irAFiltro(query: string) {
    this.router.navigate(['/filtro'], { queryParams: { query } });
  }

  onKeyEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (this.query.trim().length > 0 && keyboardEvent.key === 'Enter') {
      this.resultados = [];
      this.irAFiltro(this.query.trim());
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.resultados = [];
    }
  }
}