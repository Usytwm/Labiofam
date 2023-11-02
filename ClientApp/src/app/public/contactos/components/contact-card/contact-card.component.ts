import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/Interfaces/Contact';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styles: [
  ]
})
export class ContactCardComponent implements OnInit {
  @Input()
  public contact!: Contact;

  ngOnInit(): void {
    if(!this.contact ) throw Error('Contact property is required')
  }


}
