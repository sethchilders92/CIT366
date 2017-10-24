import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { Contact } from '../contacts.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [
  new Contact('1', 'Bro. Jackson', 'jacksonk@byui.edu', '208-496-3771',
              'https://web.byui.edu/Directory/Employee/jacksonk.jpg',
              null),
  new Contact('2', 'Bro. Barzee', 'barzeer@byui.edu', '208-496-3768',
              'https://web.byui.edu/Directory/Employee/barzeer.jpg',
              null)
  ];

  constructor() {}

  ngOnInit() {
  }

  onSelected(contact: Contact) {
    // unsure if I am supposed to pass "contact" or not
    this.selectedContactEvent.emit(contact);
  }
}
