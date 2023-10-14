import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ClientApp';

  private routesWithoutMenu = ['/login', '/register', '/forgot-password'];

  showNavMenu$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => !this.routesWithoutMenu.includes(this.router.url))
  );

  constructor(private router: Router) {}
}
