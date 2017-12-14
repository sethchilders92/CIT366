import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from '../contacts.model';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  @Output() contactSelected = new EventEmitter<void>();
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.contactSelected.emit();
  }
}
