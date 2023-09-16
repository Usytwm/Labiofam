import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  
  productos: any[] = [
    { name: 'bioproducto1', img: 'assets/IMG1.jpeg', desc: 'Descripción del bioproducto1' },
    { name: 'bioproducto2', img: 'assets/IMG2.jpeg', desc: 'Descripción del bioproducto2' },
    { name: 'bioproducto3', img: 'assets/IMG3.jpeg', desc: 'Descripción del bioproducto3' },
    { name: 'bioproducto4', img: 'assets/IMG4.jpeg', desc: 'Descripción del bioproducto4' },
    { name: 'bioproducto5', img: 'assets/IMG5.jpeg', desc: 'Descripción del bioproducto5' },
    { name: 'bioproducto6', img: 'assets/IMG6.jpeg', desc: 'Descripción del bioproducto6' }
  ];
  
  
  constructor(private _config: NgbCarouselConfig) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
