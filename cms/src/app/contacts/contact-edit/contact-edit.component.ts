import {Component, OnInit, ViewChild} from '@angular/core';
import {Contact} from "../contacts.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ContactService} from "../contact.service";
import {Subscription} from "rxjs/Subscription";
import {isNullOrUndefined} from "util";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  @ViewChild('f') contactEditForm: NgForm;
  contact: Contact = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  subscription: Subscription;
  originalContact: Contact;
  id: string;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (param: Params) => {
          this.id = param['id'];
          if (isNullOrUndefined(this.id)) {
            this.editMode = false;
            return;
          }
          this.originalContact = this.contactService.getContact(this.id);
          if (isNullOrUndefined(this.originalContact)) {
            return;
          }
          this.editMode = true;
          if (isNullOrUndefined(this.contact.group)) {
            this.contact = JSON.parse(JSON.stringify(this.originalContact));
          } else {
            const groupCopy = this.contact.group.slice();
            // maybe stringify groupCopy instead
            this.groupContacts = JSON.parse(JSON.stringify(this.originalContact));
          }
        }
      );
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    const newContact = new Contact(values.id, values.name, values.email, values.phone, values.imageUrl, values.group);
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    // route back to the '/contats' URL
    this.editMode = false;
    form.reset();
  }

  onCancel() {
    this.contactEditForm.reset();
    this.editMode = false;
  }
}
