import {Component, Input, OnInit} from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactListComponent} from '../contact-list/contact-list.component';
import {ContactService} from '../contact.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: string;
  constructor(private contactService: ContactService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.contact = this.contactService.getContact(this.id);
        }
      );
  }

  onEditContact() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
  }

  onDeleteContact() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['contacts'], {relativeTo: this.activatedRoute});
  }

}
