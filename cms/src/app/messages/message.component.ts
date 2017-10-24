import { Component, OnInit } from '@angular/core';
import {Message} from './message.model';

@Component({
  selector: 'cms-messages',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessagesComponent implements OnInit {
  selectedMessage: Message;
  constructor() { }

  ngOnInit() {
  }

}
