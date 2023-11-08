import { Service } from './../../../../Interfaces/Service';
import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ServicesService } from './../../../../Services/services.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-services',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],

})
export class ServicesComponent implements OnInit {

  loading: Boolean = false;
  servicios: Service[] = [];

  constructor(
    private _servicesservices: ServicesService
  ) { }
  ngOnInit(): void {
    this.obtenerServicios();
  }


  obtenerServicios() {
    this.loading = true;
    this._servicesservices.getAll().subscribe((data) => {
      this.servicios = data;
      console.log(data);
      this.loading = false;
    });
  }
}
