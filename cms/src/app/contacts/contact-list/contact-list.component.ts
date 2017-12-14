import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  private subscription: Subscription;
  contacts: Contact[] = [];
  searchBox: string;
  term: string;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) {
    this.contacts = this.contactService.getContacts();
  }

  ngOnInit() {
    // maybe delete this subscription
    this.contactService.contactChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      );

    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contactsList: Contact[]) => {
          this.contacts = contactsList;
        }
      );
  }

  onKeyPress(value: string) {
    this.term = value;
  }

  // onSelected(contact: Contact) {
  //   this.contactService.contactSelectedEvent.emit(contact);
  // }
}
