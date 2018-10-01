import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Http, Headers, RequestOptions } from '@angular/http';
import { DocumentDTO } from '../DTOs/documentDTO';
import { DocumentDTOdata } from '../DTOs/documentDTO2';

@Injectable({
  providedIn: 'root'
})
export class DocumentGeneratorService {

  constructor(private http: Http) { }

  generateDocument(documentDTO: DocumentDTO):Observable<string>{
    let apiURL = 'http://localhost:8080/document-management/document';
    return this.http.post(apiURL,documentDTO).pipe(map(response => response.text()));
  }

  previewDocument(docId: any): Observable<String>{
    let apiURL = 'http://localhost:8080/document-management/document/' + docId;
    return this.http.get(apiURL).pipe(map(response => response.text()));
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
