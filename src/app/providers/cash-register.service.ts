import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map,catchError } from "rxjs/operators";
import { Http, Headers, RequestOptions } from '@angular/http';
import { ClientDTO } from '../DTOs/clientDTO';
import { ClientManagerDTO } from '../DTOs/clientManagerDTO';
import { throwError, Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterService {
  
  constructor(private http: Http) { }

  createNewClient(newClient: ClientManagerDTO):Observable<ClientDTO>{
    let apiURL = 'http://localhost:8080/client-management/client';
    return this.http.post(apiURL,newClient).pipe(
      map(res => {
        var result = res.json();
          return new ClientDTO(
            result.id,
            result.name,
            result.bulstat,
            result.address,
            result.comment,
            result.egn,
            result.tdd,
            result.manager.name,
            result.manager.phone
          );
      })
    );
  }

  updateClientInfo(editedClient: ClientManagerDTO,id : number ):Observable<ClientDTO>{
    let apiURL = 'http://localhost:8080/client-management/client/'+id;
    return this.http.put(apiURL,editedClient).pipe(
      map(res => {
        var result = res.json();
          return new ClientDTO(
            result.id,
            result.name,
            result.bulstat,
            result.address,
            result.comment,
            result.egn,
            result.tdd,
            result.manager.name,
            result.manager.phone
          );
      })
    );
  }

  getAllClients(data: any): Observable<ClientDTO[]> {
    let username: string = data.user;
    let password: string = data.pass;
    let headers: Headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    headers.append('Access-Control-Allow-Origin','*');

    let apiURL = `http://localhost:8080/client-management/client`;
    return this.http.get(apiURL,{headers:headers}).pipe(
      catchError((error) => {
        return Observable.throw(error);  
      }),
      map(res => {
        return res.json().map(item => {
          return new ClientDTO(
            item.id,
            item.name,
            item.bulstat,
            item.address,
            item.comment,
            item.egn,
            item.tdd,
            item.manager.name,
            item.manager.phone
          );
        });
        
      })
    );
  }

  

}
