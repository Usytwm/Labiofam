import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/Interfaces/Usuario';
import { PersonaService } from 'src/app/Services/persona.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  id: Number;
  persona!: Usuario;

  constructor(
    private personaService: PersonaService,
    private aRoute: ActivatedRoute
  ) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getPersona();
  }

  getPersona() {
    this.personaService.getPersona(this.id).subscribe((data) => {
      this.persona = data;
    });
  }
}
