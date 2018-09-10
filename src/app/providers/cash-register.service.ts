import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterService {
  
  constructor(private http: Http) { }

  search(term: string): Observable<any> {
    let apiURL = ``;
    return this.http.get(apiURL).pipe(map(data => {}));
    
  }

}
