import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Output() messagedWasAddedEvent = new EventEmitter<Message>();
  selectedMessage: Message;

  messages: Message[] = [
    new Message('1', 'Dinner', 'What\'s for dinner?', 'Seth'),
    new Message('2', 'Dinner', 'Rolls and Texas Prime?', 'Yamada'),
    new Message('3', 'Dinner', 'In there!!', 'Tyler')
  ];

  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
    this.messagedWasAddedEvent.emit(message);
    this.messages.push(message);
  }

}
