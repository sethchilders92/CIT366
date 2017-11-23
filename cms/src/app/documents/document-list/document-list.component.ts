import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService} from '../documents.service';
import {Params} from "@angular/router";


@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  constructor(private documentService: DocumentsService) {
    this.documents = this.documentService.getDocuments();
  }
  ngOnInit() {
    // this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent
      .subscribe(
        (document: Document[]) => {
          this.documents = document;
        }
      );
  }

}
