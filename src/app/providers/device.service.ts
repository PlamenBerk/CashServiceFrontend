import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Http, Headers, RequestOptions } from '@angular/http';
import { FullDeviceDTO } from '../DTOs/fullDeviceDTO';
import { DeviceDTO } from '../DTOs/deviceDTO';
import { UrlHelper } from '../client-site-component/Utils';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  siteId: number;

  constructor(private http: Http) { }

  editDevice(deviceDTO: DeviceDTO, deviceId: number): Observable<FullDeviceDTO> {
    let apiURL = UrlHelper.url + 'device-management/device/' + deviceId;
    return this.http.put(apiURL, deviceDTO).pipe(
      map(res => {
        let result = res.json();
        return new FullDeviceDTO(
          result.id,
          result.sim,
          result.deviceNumPostfix,
          result.fiscalNumPostfix,
          result.napNumber,
          result.napDate,
          result.modelOfDevice,
          result.simPhone
        );
      })
    );
  }

  deleteClient(id: number, data: any): Observable<FullDeviceDTO> {
    let username: string = data.user;
    let password: string = data.pass;
    let headers: Headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json; charset=UTF-8');

    let apiURL = UrlHelper.url + 'device-management/device/' + id;

    return this.http.delete(apiURL, { headers: headers }).pipe(
      map(res => {
        let result = res.json();
        return new FullDeviceDTO(
          result.id,
          result.sim,
          result.deviceNumPostfix,
          result.fiscalNumPostfix,
          result.napNumber,
          result.napDate,
          result.modelOfDevice,
          result.simPhone
        );
      }),
      catchError((error) => {
        return Observable.throw(error);
      })
    );
  }

  createNewDevice(newDevice: DeviceDTO, siteId: number, modelId: number): Observable<FullDeviceDTO> {
    let apiURL = UrlHelper.url + 'device-management/device/' + siteId + '/' + modelId;
    return this.http.post(apiURL, newDevice).pipe(
      map(res => {
        let result = res.json();
        console.log('res', result);
        return new FullDeviceDTO(
          result.id,
          result.sim,
          result.deviceNumPostfix,
          result.fiscalNumPostfix,
          result.napNumber,
          result.napDate,
          result.modelOfDevice,
          result.simPhone
        );
      })
    );
  }

  getDevicesForSite(siteId: number): Observable<FullDeviceDTO[]> {
    this.siteId = siteId;
    let params = { "siteId": this.siteId.toString() };
    let apiURL = UrlHelper.url + `device-management/device`;
    return this.http.get(apiURL, { params: params }).pipe(
      map(res => {
        return res.json().map(item => {
          return new FullDeviceDTO(
            item.id,
            item.sim,
            item.deviceNumPostfix,
            item.fiscalNumPostfix,
            item.napNumber,
            item.napDate,
            item.modelOfDevice,
            item.simPhone
          );
        });

      })
    );
  }
}
