import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Http, Headers, RequestOptions } from '@angular/http';
import { FullDeviceDTO } from '../DTOs/fullDeviceDTO';
import { DeviceDTO } from '../DTOs/deviceDTO';
import { UrlHelper } from '../client-site-component/Utils';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  siteId: number;

  constructor(private http: Http) { }

  editDevice(deviceDTO: DeviceDTO,deviceId:number): Observable<FullDeviceDTO>{
    let apiURL = UrlHelper.url + 'device-management/device/'+ deviceId;
    return this.http.put(apiURL,deviceDTO).pipe(
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
  
  createNewDevice(newDevice: DeviceDTO,siteId: number,modelId: number):Observable<FullDeviceDTO>{
    let apiURL = UrlHelper.url + 'device-management/device/'+ siteId + '/' + modelId;
    return this.http.post(apiURL,newDevice).pipe(
      map(res => {
        var result = res.json();
        console.log('res',result);
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
    this.siteId = siteId;
    var params = {"siteId": this.siteId.toString()};
    let apiURL = UrlHelper.url + `device-management/device`;
    return this.http.get(apiURL,{params: params}).pipe(
      map(res => {
        return res.json().map(item => {
          return new FullDeviceDTO(
            item.id,
            item.sim,
            item.deviceNumPostfix,
            item.fiscalNumPostfix,
            item.napNumber,
            item.napDate
          );
        });
        
      })
    );
  }
}
