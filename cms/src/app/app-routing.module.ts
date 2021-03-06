import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DocumentsComponent} from './documents/documents.component';
import {MessagesComponent} from './messages/message.component';
import {ContactsComponent} from './contacts/contacts.component';
import {DocumentEditComponent} from './documents/document-edit/document-edit.component';
import {DocumentDetailComponent} from './documents/document-detail/document-detail.component';
import {ContactDetailComponent} from './contacts/contact-detail/contact-detail.component';
import {ContactEditComponent} from './contacts/contact-edit/contact-edit.component';
import {DndModule} from "ng2-dnd/ng2-dnd";

const app_Routes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  { path: 'documents', component: DocumentsComponent, children: [
    // { path: "", component: DocumentsComponent}
    { path: 'new', component: DocumentEditComponent },
    { path: ':id', component: DocumentDetailComponent },
    { path: ':id/edit', component: DocumentEditComponent },
  ] },
  { path: 'messages',   component: MessagesComponent },
  { path: 'contacts',   component: ContactsComponent, children: [
    { path: 'new', component: ContactEditComponent },
    { path: ':id', component: ContactDetailComponent },
    { path: ':id/edit', component: ContactEditComponent },
  ] },

];

@NgModule({
  imports: [
    RouterModule.forRoot(app_Routes),
    DndModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
