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
    return this.router.url !== '/login' && this.router.url !== '/register';
  }
}
