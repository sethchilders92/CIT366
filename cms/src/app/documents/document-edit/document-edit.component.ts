import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DocumentsService} from '../documents.service';
import {Document} from '../document.model';
import {isNullOrUndefined} from 'util';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('f') documentEditForm: NgForm;
  document: Document;
  originalDocument: Document;
  editMode = false;
  id: number;
  subscription: Subscription;
  editedDocument: Document;

  constructor(private documentService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe(
        (param: Params) => {
          this.id = param['id'];
          if (isNullOrUndefined(this.id)) {
            this.editMode = false;
            return;
          }
          this.originalDocument = this.documentService.getDocument(this.id.toString());
          if (isNullOrUndefined(this.originalDocument)) {
            return;
          }
          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      );
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    console.log(form);
    let tempDoc: Document;
    this.id = this.documentService.getMaxId();
    console.log(`After getMaxId the id is ${this.id}`);
    tempDoc = this.documentService.getDocument(this.id.toString());
    console.log("tempDoc: " + tempDoc.name + ' ' + tempDoc.id);
    const newDocument = new Document(values.id, values.name, values.description, values.url, values.children);
    if (this.editMode) {
      this.documentService.updateDocument(tempDoc, newDocument);
    } else {
      // console.log("Original Doc: " + this.originalDocument);
      this.documentService.deleteDocument(tempDoc);
      // console.log("New Doc: " + newDocument.id);
      this.documentService.addDocument(newDocument);
    }
    this.editMode = false;

    form.reset();
  }

  onCancel() {
    this.documentEditForm.reset();
    this.editMode = false;
  }

}
