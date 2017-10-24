import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  @Output() messageSelected = new EventEmitter<Message>();

  constructor() { }

  ngOnInit() {
  }

  onSelected(message: Message) {
    this.messageSelected.emit(this.message);
  }
}
