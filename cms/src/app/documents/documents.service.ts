import {EventEmitter, Injectable} from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable()
export class DocumentsService {
  documentSelectedEvent = new EventEmitter<Document>();
  documents: Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    this.documents.forEach(document => {
      if (id === document.id) {
        return document;
      }
    });
    return null;
  }

}
