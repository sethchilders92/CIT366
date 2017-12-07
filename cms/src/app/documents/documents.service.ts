import {EventEmitter, Injectable} from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import {Subject} from 'rxjs/Subject';
import {isNullOrUndefined} from "util";

@Injectable()
export class DocumentsService {
  documentChangedEvent  = new EventEmitter<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  currentId: number;
  maxId: number;
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (id === document.id) {
        return document;
      }
    }
    return null;
  }

  addDocument(newDocument: Document) {
    if (isNullOrUndefined(newDocument)) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (isNullOrUndefined(originalDocument) || isNullOrUndefined(newDocument)) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  deleteDocument(document: Document) {
    if (isNullOrUndefined(document)) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents = this.documents.splice(pos, 1);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
    // this.documentChangedEvent.emit(this.documents.slice());
  }

  getMaxId(): number {
    this.maxId = 0;
    for (let document of this.documents) {
      this.currentId = parseInt(document.id, 10);
        // this.documents.indexOf(document);
      if (this.currentId > this.maxId) {
        this.maxId = this.currentId;
      }
    }
    return this.maxId;
  }

}
