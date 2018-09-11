import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Http, Headers, RequestOptions } from '@angular/http';
import { ClientDTO } from '../ClientDTO/cliendDTO';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterService {
  
  constructor(private http: Http) { }

  getAllClients(): Observable<ClientDTO[]> {
    let apiURL = `http://localhost:8080/client-management/client`;
    return this.http.get(apiURL).pipe(
      map(res => {
        console.log('in service',res.json());
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
