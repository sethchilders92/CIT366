import {Component, OnInit, OnDestroy} from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService} from '../documents.service';
import {Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
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

    this.subscription = this.documentService.documentListChangedEvent
      .subscribe(
        (documentsList: Document[]) => {
          this.documents = documentsList;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
