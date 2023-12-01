import { Component,OnInit } from '@angular/core';
import { ServicesComponent } from './../../servicios/components/servicios/servicios.component'
import {ServicesService} from './../../../Services/EntitiesServices/services.service'
import {Service} from './../../../Interfaces/Service'
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
 servicios: Service[] = [];

  constructor(private _servicesservices: ServicesService) {}
  ngOnInit(): void {
    this.obtenerServicios();
  }

  obtenerServicios() {
    this._servicesservices.getAll().subscribe((data) => {
      this.servicios = data;
      console.log(data);
    });
  }
}
