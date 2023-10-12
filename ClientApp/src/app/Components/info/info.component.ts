import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User as Usuario } from 'src/app/Interfaces/User';
import { PersonaService } from 'src/app/Services/persona.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  id: string;
  persona!: Usuario;

  constructor(
    private personaService: PersonaService,
    private aRoute: ActivatedRoute
  ) {
    this.id = String(this.aRoute.snapshot.paramMap.get('id'));
    console.log(this.id);
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
