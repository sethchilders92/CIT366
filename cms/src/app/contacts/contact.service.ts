import {EventEmitter, Injectable} from '@angular/core';
import {Contact} from './contacts.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import {Subject} from 'rxjs/Subject';
import {isNullOrUndefined} from 'util';

@Injectable()
export class ContactService {
  contactChangedEvent  = new EventEmitter<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  currentId: number;
  maxId: number;
  maxContactId: number;


  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
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

  // deleteContact(contact: Contact) {
  //   if (contact === null) {
  //     return;
  //   }
  //   const pos = this.contacts.indexOf(contact);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.contacts.splice(pos, 1);
  //   this.contactChangedEvent.emit(this.contacts.slice());
  // }

  addContact(newContact: Contact) {
    if (isNullOrUndefined(newContact)) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (isNullOrUndefined(originalContact) || isNullOrUndefined(newContact)) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  deleteContact(contact: Contact) {
    if (isNullOrUndefined(contact)) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts = this.contacts.splice(pos, 1);
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  getMaxId(): number {
    this.maxId = 0;
    for (let contact of this.contacts) {
      this.currentId = parseInt(contact.id, 10);
      if (this.currentId > this.maxId) {
        this.maxId = this.currentId;
      }
    }
    return this.maxId;
  }
}
