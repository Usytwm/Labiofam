import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/Interfaces/Contact';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styles: [
  ]
})
export class ContactPageComponent {
  @Input()
  public contact!: Contact;

  ngOnInit(): void {
    if(!this.contact ) throw Error('Contact property is required')
  }

}
