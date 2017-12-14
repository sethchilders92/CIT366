import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {Contact} from './contacts.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import {Subject} from 'rxjs/Subject';
import {isNullOrUndefined} from 'util';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ContactService implements OnInit {
  contactChangedEvent  = new EventEmitter<Contact[]>();
  contactSelectedEvent = new Subject<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  currentId: number;
  maxId: number;
  maxContactId: number;


  constructor(private http: Http) {
   this.initContacts();
  }

  ngOnInit() {
    this.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContactIndex(id: number) {
    return this.contacts[id];
  }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (id === contact.id) {
        return contact;
      }
    }
    return null;
  }

  addContact(newContact: Contact) {
    if (isNullOrUndefined(newContact)) {
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts(this.contacts.slice());
    // const contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
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
    this.storeContacts(this.contacts.slice());
    // const contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
  }

  deleteContact(contact: Contact) {
    if (isNullOrUndefined(contact)) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts(this.contacts.slice());
    // const contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
  }

  getMaxId(): number {
    this.maxId = 0;
    for (const contact of this.contacts) {
      this.currentId = parseInt(contact.id, 10);
      if (this.currentId > this.maxId) {
        this.maxId = this.currentId;
      }
    }
    return this.maxId;
  }

  initContacts() {
    this.http.get('https://sethchilders92cms.firebaseio.com/contacts.json')
      .map(
        (response: Response) => {
          this.contacts = response.json();
          return this.contacts;
        }
      ).subscribe(
      (contactsReturned: Contact[]) => {
        this.contacts = contactsReturned;
        this.maxContactId = this.getMaxId();
        const contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
      }
    );
  }

  storeContacts(updatedContacts: Contact[]) {
    // const sendContacts = JSON.stringify(updatedContacts);
    return this.http.put('https://sethchilders92cms.firebaseio.com/contacts.json', updatedContacts)
      .subscribe(
        (response: Response) => {
        // this.contacts = response.json();
        // this.maxContactId = this.getMaxId();
        this.contacts = updatedContacts;
        const contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
        this.initContacts();
      }
    );
  }
}
