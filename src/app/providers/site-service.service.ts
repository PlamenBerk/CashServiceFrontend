import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Http, Headers, RequestOptions } from '@angular/http';
import { SiteDTO } from '../DTOs/SiteDTO';
import { FullSiteDTO } from '../DTOs/fullSiteDTO';

@Injectable({
  providedIn: 'root'
})
export class SiteServiceService {
  private id: number;
  constructor(private http: Http) { }

  editSite(siteDTO: SiteDTO,siteId:number): Observable<FullSiteDTO>{
    let apiURL = 'http://localhost:8080/site-management/site/'+siteId;
    return this.http.put(apiURL,siteDTO).pipe(
      map(res => {
        var result = res.json();
          return new FullSiteDTO(
            result.id,
            result.name,
            result.address,
            result.phone
          );
      })
    );
  }
  
  createNewSite(newSite: SiteDTO,clientId: number):Observable<FullSiteDTO>{
    let apiURL = 'http://localhost:8080/site-management/site/'+ clientId;
    return this.http.post(apiURL,newSite).pipe(
      map(res => {
        var result = res.json();
          return new FullSiteDTO(
            result.id,
            result.name,
            result.address,
            result.phone
          );
      })
    );
  }

  getSitesForClient(id: number): Observable<FullSiteDTO[]> {
    console.log('id',id);
    this.id = id;

    var params = {"clientId": this.id.toString()};

    let apiURL = `http://localhost:8080/site-management/site`;
    return this.http.get(apiURL,{params: params}).pipe(
      map(res => {
        console.log('in site service',res.json());
        return res.json().map(item => {
          return new FullSiteDTO(
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
