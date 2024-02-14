import { Service } from './../../../../Interfaces/Service';
import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServicesService } from './../../../../Services/EntitiesServices/services.service';
import { FileService } from 'src/app/Services/FilesService/File.service';

@Component({
  selector: 'app-Services',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],

})
export class ServicesComponent implements OnInit {

  loading: Boolean = false;
  servicios: Service[] = [];

  constructor(
    private _fotoservice: FileService,
    private _servicesservices: ServicesService) { }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.obtenerServicios();
  }
  getPhoto(data: Service) {
    this._fotoservice.getPhoto(data.image!).subscribe((photo) => {
      // console.log(photo);
      photo.text().then((text) => {
        data.image = 'data:image/jpeg;base64,' + JSON.parse(text).fileContents;
      });
    });
  }
  obtenerServicios() {
    this.loading = true;
    this._servicesservices.getAll().subscribe((data) => {
      this.servicios = data;
      this.servicios.forEach((service) => {
        this.getPhoto(service)
      })
      console.log(data);
      this.loading = false;
    });
  }
}
