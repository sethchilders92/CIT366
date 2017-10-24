export class Document {
  public documentId: string;
  public name: string;
  public description: string;
  public url: string;
  public children: Array<Document>;

  constructor(documentId: string, name: string, description: string, url: string, children: Array<Document>) {
    this.documentId = documentId;
    this.name = name;
    this.description = description;
    this.url = url;
    this.children = children;
  }
}
