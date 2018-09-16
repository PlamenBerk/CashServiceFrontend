import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Http, Headers, RequestOptions } from '@angular/http';
import { SiteDTO } from '../SiteDTO/SiteDTO';

@Injectable({
  providedIn: 'root'
})
export class SiteServiceService {
  private id: number;
  constructor(private http: Http) { }

  getSitesForClient(id: number): Observable<SiteDTO[]> {
    console.log('id',id);
    this.id = id;

    var params = {"clientId": this.id.toString()};

    let apiURL = `http://localhost:8080/site-management/site`;
    return this.http.get(apiURL,{params: params}).pipe(
      map(res => {
        console.log('in site service',res.json());
        return res.json().map(item => {
          return new SiteDTO(
            item.id,
            item.name,
            item.address,
            item.phone
          );
        });
        
      })
    );
  }
}
