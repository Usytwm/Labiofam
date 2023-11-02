import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from 'src/app/Interfaces/Contact';

@Pipe({
  name: 'contactImage'
})

export class ContactImagePipe implements PipeTransform{
  transform( contact: Contact): string {
    if( !contact.contact_ID){
      return 'assets/no-image.png';
    }
    return 'assets/no-image.png'
  }

}
