import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;
  imageSrc: string = '';
  searchQuery: string = '';
  showSearchResults: boolean = false;
  
  searchResults: string[] = [
    'Resultado 1',
    'Resultado 2',
    'Resultado 3',
    'Ejemplo de búsqueda',
    'Otra opción'
  ];
  
  filteredResults: string[] = [];

  @ViewChild('searchBar') searchBar!: ElementRef;

  ngOnInit() {
    const userJson = sessionStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.imageSrc = user.user.imageBase64;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


onSearchInput() {
  if (this.searchQuery.length > 1) {
    this.filteredResults = this.searchResults.filter(item =>
      item.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.showSearchResults = true;
  } else {
    this.filteredResults = [];
    this.showSearchResults = false;
  }
}

selectResult(result: string) {
  this.searchQuery = result;
  this.showSearchResults = false;
  // Lógica adicional al seleccionar un resultado
}

@HostListener('document:click', ['$event'])
onClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  
  if (!target.closest('.search-container')) {
    this.showSearchResults = false;
  }
}
}