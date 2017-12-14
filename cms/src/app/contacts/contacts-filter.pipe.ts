import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from './contacts.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

   transform(contacts: Contact[], searchText: string): any {
    let filteredArray: Contact[] = [];
    if (!contacts) { return []; }
    if (!searchText) { return contacts; }

    filteredArray = contacts.filter(
      (contact: any) => {
          if (contact.name.toLowerCase().includes(searchText.toLowerCase())) {
            return contact.name;
          }
          // return;
      }
    );

    if (filteredArray.length < 1) {
      return contacts;
    }

    return filteredArray;
  }
}
