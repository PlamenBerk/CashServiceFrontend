import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Http, Headers, RequestOptions } from '@angular/http';
import { DocumentDTO } from '../DTOs/documentDTO';
import { DocumentDTOdata } from '../DTOs/documentDTO2';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ResponseContentType } from '@angular/http';
import { UrlHelper } from '../client-site-component/Utils';
import { CertificateDTO } from '../DTOs/certificateDTO';
import { ProtocolDTO } from '../DTOs/protocolDTO';

@Injectable({
  providedIn: 'root'
})
export class DocumentGeneratorService {

  constructor(private http: Http) { }

  generateDocument(documentDTO: DocumentDTO):Observable<string>{
    let apiURL = UrlHelper.url + 'document-management/document';
    return this.http.post(apiURL,documentDTO,{ responseType: ResponseContentType.Blob}).pipe(
      map(this.showRes),
      catchError((error) => {
        return Observable.throw(error);  
      }),
    );
  }

  removeExpiredDoc(docId): Observable<string>{
    let apiURL = UrlHelper.url + 'document-management/expired-document/' + docId;
    return this.http.get(apiURL).pipe(
      map(response => response.text())
    );
  }

  generateCertificate(certificateDTO: CertificateDTO):Observable<string>{
    let apiURL = UrlHelper.url + 'document-management/document-cert';
    return this.http.post(apiURL,certificateDTO,{ responseType: ResponseContentType.Blob}).pipe(
      map(this.showRes),
      catchError((error) => {
        return Observable.throw(error);  
      }),
    );
  }

  generateProtocol(protocolDTO: ProtocolDTO):Observable<string>{
      let apiURL = UrlHelper.url + 'document-management/document-protocol';
       return this.http.post(apiURL,protocolDTO,{ responseType: ResponseContentType.Blob}).pipe(
      map(this.showRes),
      catchError((error) => {
        return Observable.throw(error);  
      }),
    );
  }

  generateRequest(deviceId: string):Observable<string>{
    let apiURL = UrlHelper.url + 'document-management/document-request/' + deviceId;
    return this.http.get(apiURL,{ responseType: ResponseContentType.Blob}).pipe(
      map(this.showRes),
      catchError((error) => {
        return Observable.throw(error);  
      })
    );
  }

  previewDocument(docId: any,data: any): Observable<Response>{
    let username: string = data.user;
    let password: string = data.pass;
    let headers: Headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Content-Type' , 'application/json; charset=UTF-8');

    let apiURL = UrlHelper.url + 'document-management/document/' + docId;
    return this.http.get(apiURL,{ responseType: ResponseContentType.Blob,headers:headers }).pipe(
      map(this.showRes),
      catchError((error) => {
        return Observable.throw(error);  
      }),
    );
  }

  rewriteExpiredDocument(documentDTO: DocumentDTO, docId: string): Observable<string>{
    let apiURL = UrlHelper.url + 'document-management/document/' + docId;
    return this.http.post(apiURL,documentDTO,{ responseType: ResponseContentType.Blob}).pipe(
      map(this.showRes),
      catchError((error) => {
        return Observable.throw(error);
      }),
    );
  }

  private showRes(res:Response){
    return new Blob([res.blob()], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
  }

  searchExpiredDocuments(startDate:string, endDate: string):Observable<DocumentDTOdata[]>{
    let apiURL = UrlHelper.url + 'document-management/document';

    let params = {"docStartDate": startDate,"docEndDate":endDate};

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
