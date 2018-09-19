import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Http, Headers, RequestOptions } from '@angular/http';
import { FullDeviceDTO } from '../DTOs/fullDeviceDTO';
import { DeviceDTO } from '../DTOs/deviceDTO';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: Http) { }

  editDevice(deviceDTO: DeviceDTO,deviceId:number): Observable<FullDeviceDTO>{
    // let apiURL = 'http://localhost:8080/site-management/site/'+siteId;
    // return this.http.put(apiURL,siteDTO).pipe(
    //   map(res => {
    //     var result = res.json();
    //       return new FullSiteDTO(
    //         result.id,
    //         result.name,
    //         result.address,
    //         result.phone
    //       );
    //   })
    // );
    return null;
  }
  
  createNewDevice(newDevice: DeviceDTO,siteId: number,modelId: number):Observable<FullDeviceDTO>{
    let apiURL = 'http://localhost:8080/device-management/device/'+ siteId + '/' + modelId;
    return this.http.post(apiURL,newDevice).pipe(
      map(res => {
        var result = res.json();
          return new FullDeviceDTO(
            result.id,
            result.sim,
            result.deviceNumPostfix,
            result.fiscalNumPostfix,
            result.napNumber,
            result.napDate
          );
      })
    );
  }

  getDevicesForSite(siteId: number): Observable<FullDeviceDTO[]> {
    // this.id = id;
    // var params = {"clientId": this.id.toString()};
    // let apiURL = `http://localhost:8080/site-management/site`;
    // return this.http.get(apiURL,{params: params}).pipe(
    //   map(res => {
    //     return res.json().map(item => {
    //       return new FullSiteDTO(
    //         item.id,
    //         item.name,
    //         item.address,
    //         item.phone
    //       );
    //     });
        
    //   })
    // );
    return null;
  }
}
