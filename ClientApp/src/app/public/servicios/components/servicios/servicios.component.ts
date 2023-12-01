import { Service } from './../../../../Interfaces/Service';
import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServicesService } from './../../../../Services/EntitiesServices/services.service';

@Component({
  selector: 'app-Services',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],

})
export class ServicesComponent implements OnInit {

  loading: Boolean = false;
  servicios: Service[] = [];

  constructor(private _servicesservices: ServicesService) {}
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
