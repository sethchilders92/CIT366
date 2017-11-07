import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService} from '../documents.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  onSelectedDocument(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);
  }

  constructor(private documentService: DocumentsService) {
    this.documents = this.documentService.getDocuments();
  }
  ngOnInit() {
  }

}
