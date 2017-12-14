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
  invalidGroupContact: boolean = false;
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
    values.id = this.contactService.getMaxId();
    console.log(values.id + 1);
    const newContact = new Contact(values.id, values.name, values.email, values.phone, values.imageUrl, values.group);
    console.log(this.editMode);
    console.log(newContact);
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      console.log("adding!");
      this.contactService.addContact(newContact);
    }

    // // route back to the '/contats' URL
    // this.editMode = false;
    // form.reset();

    this.router.navigate(['/contacts'], {relativeTo: this.route});
  }

  onCancel() {
    // this.contactEditForm.reset();
    // this.editMode = false;
    this.router.navigate(['/contacts'], {relativeTo: this.route});
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) { // newContact has no value?
      return true;
    }

    if (newContact.id === this.contact.id) {
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number) {
    // If contact is outside the bounds of the array
    if (idx < 0 || idx >= this.groupContacts.length) {
      return;
    }

    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }

}
