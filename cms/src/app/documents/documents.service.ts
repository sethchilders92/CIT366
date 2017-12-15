import {EventEmitter, Injectable} from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import {Subject} from 'rxjs/Subject';
import {isNullOrUndefined} from 'util';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Headers } from '@angular/http';
// import { HttpHeaders} from '@angular/common/http';

@Injectable()
export class DocumentsService {
  documentChangedEvent  = new EventEmitter<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  currentId: number;
  maxId: number;
  maxDocumentId: number;

  constructor(private http: Http) {
    this.initDocuments();
    // this.documents = MOCKDOCUMENTS;
    // this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocumentIndex(id: string) {
    return this.documents[id];
  }

  getDocument(id: string): Document {
    for (const document of this.documents) {
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

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    newDocument.id = '';
    const strDocument = JSON.stringify(newDocument);

    this.http.post('http://localhost:3000/documents', strDocument, {headers: headers})
      .map(
        (response: Response) => {
          return response.json().obj;
        })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          // maybe documentChangedEvent
          this.documentListChangedEvent.next(this.documents.slice());
        });
  }
  //   this.maxDocumentId++;
  //   newDocument.id = this.maxDocumentId.toString();
  //   this.documents.push(newDocument);
  //   this.storeDocuments();
  //   // this.documentListChangedEvent.next(this.documents.slice());
  // }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (isNullOrUndefined(originalDocument) || isNullOrUndefined(newDocument)) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    const strDocument = JSON.stringify(newDocument);

    // this.http.patch('http://localhost:3000/documents/' + originalDocument.id
    //   , strDocument, {headers: headers})
    //   .map(
    //     (response: Response) => {
    //       return response.json().obj;
    //     })
    //   .subscribe(
    //     (documents: Document[]) => {
    //       this.documents = documents;
    //       // maybe documentChangedEvent
    //       this.documentListChangedEvent.next(this.documents.slice());
    //     });
  }

  //   newDocument.id = originalDocument.id;
  //   this.documents[pos] = newDocument;
  //   this.storeDocuments();
  //   // this.documentListChangedEvent.next(this.documents.slice());
  // }

  deleteDocument(document: Document) {
    if (isNullOrUndefined(document)) {
      return;
    }
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .map(
        (response: Response) => {
          return response.json().obj;
        })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentListChangedEvent.next(this.documents.slice());
        });
  }

  getMaxId(): number {
    this.maxId = 0;
    for (const document of this.documents) {
      this.currentId = parseInt(document.id, 10);
      if (this.currentId > this.maxId) {
        this.maxId = this.currentId;
      }
    }
    return this.maxId;
  }

  initDocuments() {
      this.http.get('http://localhost:3000/documents')
        .map(
          (response: Response) => {
            this.documents = response.json();
            return this.documents;
          }
        ).subscribe(
          (documentsReturned: Document[]) => {
            this.documents = documentsReturned;
            this.maxDocumentId = this.getMaxId();
            const documentsListClone = this.documents.slice();
            this.documentListChangedEvent.next(documentsListClone);
          }
        );
  }

  storeDocuments() {
    const sendDocs = JSON.stringify(this.documents);
    this.http.put('https://localhost:3000/documents', sendDocs).subscribe(
      (response: Response) => {
        this.documents = response.json();
        this.maxDocumentId = this.getMaxId();
        const documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
        // this.initDocuments();
      }
    );
  }
}
