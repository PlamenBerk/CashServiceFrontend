import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Http, Headers, RequestOptions } from '@angular/http';
import { DocumentDTO } from '../DTOs/documentDTO';

@Injectable({
  providedIn: 'root'
})
export class DocumentGeneratorService {

  constructor(private http: Http) { }

  generateDocument(documentDTO: DocumentDTO):Observable<string>{
    let apiURL = 'http://localhost:8080/document-management/document';
    return this.http.post(apiURL,documentDTO).pipe(map(response => response.text()));
  }
}
