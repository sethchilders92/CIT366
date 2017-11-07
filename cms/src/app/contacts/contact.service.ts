import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from './contacts.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable()
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {

    for (let contact of this.contacts) {
      if (id === contact.id) {
        return contact;
      }
    }
    return null;
  }

  //   this.contacts.forEach(contact => {
  //     console.log('inside the forEach');
  //     if (id === contact.id) {
  //       console.log('inside the if: ' + contact.id + ' id: ' + id);
  //       return contact;
  //     }
  //   });
  //   return null;
  // }

}
