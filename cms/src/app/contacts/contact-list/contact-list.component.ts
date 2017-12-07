import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  private subscription: Subscription;
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
  }

  ngOnInit() {
    // maybe delete this subscription
    this.contactService.contactChangedEvent
      .subscribe(
        (contact: Contact[]) => {
          this.contacts = contact;
        }
      );

    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contactsList: Contact[]) => {
          this.contacts = contactsList;
        }
      );
  }

  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
}
