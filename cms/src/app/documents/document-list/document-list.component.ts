import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'Bucket-List: Fall', 'A list of the top 25 things I want to do this Fall',
      'http://clv.h-cdn.co/assets/15/39/1442931515-clv-fallbucketlistt-template.jpg'),
    new Document('2', 'Bucket-List: Winter', 'A list of the top 25 things I want to do this Winter',
      'https://i.pinimg.com/736x/13/ee/c8/13eec80c784535eb25fbd831976aba20--winter-ideas-winter-fun.jpg'),
    new Document('3', 'Bucket-List: Spring', 'A list of the top 25 things I want to do this Spring',
      'http://loveandrenovations.com/wp-content/uploads/2017/02/Spring-bucket-list-1.png'),
    new Document('4', 'Bucket-List: Summer', 'A list of the top 25 things I want to do this Summer',
      'https://i.pinimg.com/736x/21/e6/33/21e633734b4203d3c6711e19202b1773--friends-bucket-list-summer-bucket-list-ideas-summer.jpg')
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

  constructor() { }

  ngOnInit() {
  }

}
