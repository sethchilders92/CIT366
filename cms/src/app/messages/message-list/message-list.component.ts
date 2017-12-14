import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  // @Output() messagedWasAddedEvent = new EventEmitter<Message>();
  messages: Message[] = [];
  private subscription: Subscription;

  constructor(private messageService: MessagesService) {
    // this.messages = this.messageService.getMessages();
  }

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    this.subscription = this.messageService.messageListChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }

  // onAddMessage(message: Message) {
  //   this.messagedWasAddedEvent.emit(message);
  //   this.messages.push(message);
  // }
}
