import {Component, Input, OnInit} from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactListComponent} from '../contact-list/contact-list.component';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact;
  constructor() { }

  ngOnInit() {
  }

}
