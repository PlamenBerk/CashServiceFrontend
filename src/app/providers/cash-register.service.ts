import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Http, Headers, RequestOptions } from '@angular/http';
import { ClientDTO } from '../ClientDTO/clientDTO';
import { ClientManagerDTO } from '../ClientDTO/clientManagerDTO';

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
        console.log('in service',result);
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
    return null;
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

  getAllClients(): Observable<ClientDTO[]> {
    let apiURL = `http://localhost:8080/client-management/client`;
    return this.http.get(apiURL).pipe(
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
