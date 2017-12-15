import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {Message} from './message.model';
import {MOCKMESSAGES} from './MOCKMESSAGES';
import {MOCKCONTACTS} from '../contacts/MOCKCONTACTS';
import {Subject} from 'rxjs/Subject';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class MessagesService {
  messageSelectedEvent = new Subject<Message>();
  messageListChangedEvent = new Subject<Message[]>();
  // messageChangeEvent = new Subject<Message[]>();
  messages: Message[] = [];
  maxId: number;
  currentId: number;
  maxMessageId: number;


  // assign to mockcontacts?
  constructor(private http: Http) {
    // this.messages = MOCKMESSAGES;
    this.initMessages();
  }

  getMessages() {
    // console.log(this.messages.slice());
    return this.messages.slice();
  }

  getMessage(id: string) {
    for (const message of this.messages) {
      if (id === message.id) {
        return message;
      }
      return null;
    }
  }

  getMaxId() {
    this.maxMessageId = 0;
    for (const message of this.messages) {
      this.currentId = parseInt(message.id, 10);
      if (this.currentId > this.maxMessageId) {
        this.maxMessageId = this.currentId;
      }
      return this.maxMessageId;
    }
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages(this.messages.slice());
  }

  initMessages() {
    this.http.get('https://sethchilders92cms.firebaseio.com/messages.json')
      .map(
        (response: Response) => {
          this.messages = response.json();
          return this.messages;
        }
      ).subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        const messagesListClone = this.messages.slice();
        this.messageListChangedEvent.next(messagesListClone);
      }
    );
    // console.log(this.messages);

  }

  storeMessages(updatedMessages: Message[]) {
    // const sendMessages = JSON.stringify(updatedMessages);
    return this.http.put('https://sethchilders92cms.firebaseio.com/messages.json', updatedMessages)
      .subscribe(
        (response: Response) => {
          // this.contacts = response.json();
          // this.maxContactId = this.getMaxId();
          this.messages = updatedMessages;
          const messagesListClone = this.messages.slice();
          this.messageListChangedEvent.next(messagesListClone);
          this.initMessages();
        }
      );
  }
}
