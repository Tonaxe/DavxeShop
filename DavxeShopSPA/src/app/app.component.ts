import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'DavxeShop';

  constructor(private router: Router) {}

  shouldShowHeader(): boolean {
    return !['/login', '/register', '/recover-password', '/reset-password'].some(route => this.router.url.startsWith(route));
  }
  shouldShowFooter(): boolean {
    return !['/login', '/register', '/recover-password', '/reset-password','/chat'].some(route => this.router.url.startsWith(route));
  }
}
