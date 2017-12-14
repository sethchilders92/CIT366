import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router, Route } from '@angular/router';

import {Document} from '../document.model';
import {DocumentsService} from '../documents.service';
import {WindRefService} from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  @Input() document: Document;
  nativeWindow: any;
  // document: Document;
  id: string;

  constructor(private documentService: DocumentsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private windRefService: WindRefService) {

    this.nativeWindow = windRefService.getNativeWindow();
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.document = this.documentService.getDocumentIndex(this.id);
        }
      );
    this.documentService.documentSelectedEvent.subscribe(
      (document: Document) => {
        this.document = document;
      });
  }

  onEditDocument() {
    // const newDocument = new Document(values.id, values.name, values.description, values.url, values.children);
    // this.documentService.updateDocument(this.document);
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
}
