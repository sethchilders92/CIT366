import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Message} from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('messageInput') messageInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender = 'Seth Childers';

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    const mySubject  = this.subjectInputRef.nativeElement.value;
    const myMessage  = this.messageInputRef.nativeElement.value;
    const newMessage = new Message('4', this.currentSender, mySubject, myMessage);
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = null;
    this.messageInputRef.nativeElement.value = null;
  }

}
