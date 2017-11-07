import { Component, OnInit } from '@angular/core';
import {Message} from './message.model';
import {MessagesService} from './messages.service';

@Component({
  selector: 'cms-messages',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  providers: [MessagesService]
})
export class MessagesComponent implements OnInit {
  selectedMessage: Message;

  constructor(private messageService: MessagesService) { }

  ngOnInit() {
    this.messageService.messageChangeEvent
      .subscribe(
        (message: Message) => {
          this.selectedMessage = message;
        }
      );
  }

}
