import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Http, Headers, RequestOptions } from '@angular/http';
import { SiteDTO } from '../DTOs/SiteDTO';
import { FullSiteDTO } from '../DTOs/fullSiteDTO';
import { UrlHelper } from '../client-site-component/Utils';

@Injectable({
  providedIn: 'root'
})
export class SiteServiceService {
  private id: number;
  constructor(private http: Http) { }

  editSite(siteDTO: SiteDTO,siteId:number): Observable<FullSiteDTO>{
    let apiURL = UrlHelper.url + 'site-management/site/'+siteId;
    return this.http.put(apiURL,siteDTO).pipe(
      map(res => {
        let result = res.json();
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
    let apiURL = UrlHelper.url + 'site-management/site/'+ clientId;
    return this.http.post(apiURL,newSite).pipe(
      map(res => {
        let result = res.json();
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
    this.id = id;
    let params = {"clientId": this.id.toString()};
    let apiURL = UrlHelper.url + 'site-management/site';
    return this.http.get(apiURL,{params: params}).pipe(
      map(res => {
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
