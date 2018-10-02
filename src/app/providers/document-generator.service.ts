import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Http, Headers, RequestOptions } from '@angular/http';
import { DocumentDTO } from '../DTOs/documentDTO';
import { DocumentDTOdata } from '../DTOs/documentDTO2';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class DocumentGeneratorService {

  constructor(private http: Http) { }

  generateDocument(documentDTO: DocumentDTO):Observable<string>{
    let apiURL = 'http://localhost:8080/document-management/document';
    return this.http.post(apiURL,documentDTO).pipe(map(response => response.text()));
  }

  previewDocument(docId: any,data: any): Observable<String>{
    let username: string = data.user;
    let password: string = data.pass;
    let headers: Headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    headers.append('Access-Control-Allow-Origin','*');

    let apiURL = 'http://localhost:8080/document-management/document/' + docId;
    return this.http.get(apiURL,{headers:headers}).pipe(
      map(response => response.text()),
      catchError((error) => {
        return Observable.throw(error);  
      }),
    );
  }

  searchExpiredDocuments(startDate:Date, endDate: Date):Observable<DocumentDTOdata[]>{
    let apiURL = 'http://localhost:8080/document-management/document';

    var dayOfMonthStart = startDate.getDate() < 10 ? "0"+startDate.getDate() : startDate.getDate();
    var dayOfMonthEnd = endDate.getDate() < 10 ? "0" + endDate.getDate() : endDate.getDate();
    
    var monthOfYearStart = (startDate.getMonth()+1) < 10 ? "0"+(startDate.getMonth()+1) : (startDate.getMonth()+1);
    var monthOfYearEnd = (endDate.getMonth()+1) < 10 ? "0"+(endDate.getMonth()+1) : (endDate.getMonth()+1);

    var yearStart = startDate.getFullYear();
    var yearEnd = endDate.getFullYear();

    var startDateS =yearStart + "-" + monthOfYearStart + "-" + dayOfMonthStart;
    var endDateS = yearEnd + "-" + monthOfYearEnd + "-" + dayOfMonthEnd;

    var params = {"docStartDate": startDateS,"docEndDate":endDateS};

    return this.http.get(apiURL,{params: params}).pipe(map(res => {
      return res.json().map(item => {
        return new DocumentDTOdata(
          item.id,
          item.documentName,
          item.startDate,
          item.endDate
        );
      });
      
    }));
  }
}
