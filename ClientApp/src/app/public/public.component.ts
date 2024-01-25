import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../Services/async/navbar.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css'],
})
export class PublicComponent implements OnInit {
  constructor(private navbarService: NavbarService) {}
  ngOnInit(): void {
    this.navbarService.setShowNavbar(true);
  }
}
