import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Point_of_Sales } from 'src/app/Interfaces/Point_of_sales';
import { PointsOfSalesService } from 'src/app/Services/points-of-sales.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoPOSComponent implements OnInit {
  id: string;
  point?: Point_of_Sales;
  productos = [
    {
      product_ID: 'P001',
      name: 'Producto 1',
      image: 'assets/10.jpg',
      type: 'Tipo 1',
      summary: 'Este es un resumen del Producto 1.',
      specifications: 'Especificaciones del Producto 1.',
    },
    {
      product_ID: 'P002',
      name: 'Producto 2',
      image: 'assets/11.jpg',
      type: 'Tipo 2',
      summary: 'Este es un resumen del Producto 2.',
      specifications: 'Especificaciones del Producto 2.',
    },
    {
      product_ID: 'P003',
      name: 'Producto 3',
      image: 'assets/12.jpg',
      type: 'Tipo 3',
      summary: 'Este es un resumen del Producto 3.',
      specifications: 'Especificaciones del Producto 3.',
    },
    {
      product_ID: 'P004',
      name: 'Producto 4',
      image: 'assets/12.jpg',
      type: 'Tipo 4',
      summary: 'Este es un resumen del Producto 4.',
      specifications: 'Especificaciones del Producto 4.',
    },
    // Agrega más productos según sea necesario
  ];

  establecimientos: any[] = [
    {
      imagen: 'assets/10.jpg',
      nombre: 'Nombre del Establecimiento',
      descripcion: 'Descripción del Establecimiento',
    },
    {
      imagen: 'assets/11.jpg',
      nombre: 'Nombre del Establecimiento',
      descripcion: 'Descripción del Establecimiento',
    },
    {
      imagen: 'assets/12.jpg',
      nombre: 'Nombre del Establecimiento',
      descripcion: 'Descripción del Establecimiento',
    },
  ];

  constructor(
    private personaService: PointsOfSalesService,
    private aRoute: ActivatedRoute,
    private _location: Location
  ) {
    this.id = String(this.aRoute.snapshot.paramMap.get('id'));
    console.log(this.id);
  }

  ngOnInit(): void {
    this.getPoint();
  }

  getPoint() {
    this.personaService.get(this.id).subscribe((data) => {
      this.point = data;
    });
  }
  goBack() {
    this._location.back();
  }
}
