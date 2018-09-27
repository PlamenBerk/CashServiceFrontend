import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Http, Headers, RequestOptions } from '@angular/http';
import { FullDeviceModel } from '../DTOs/fullDeviceModel';
import { DeviceModel } from '../DTOs/deviceModel';

@Injectable({
  providedIn: 'root'
})
export class DeviceModelService {

  constructor(private http: Http) { }

  getAllDeviceModels(): Observable<FullDeviceModel[]>{
    let apiURL = 'http://localhost:8080/device-model-management/device-model';
    return this.http.get(apiURL).pipe(
      map(res => {
        return res.json().map(item => {
          return new FullDeviceModel(
            item.id,
            item.manufacturer,
            item.model,
            item.certificate,
            item.deviceNumPrefix,
            item.fiscalNumPrefix
          );
        });
        
      })
    );
  }

  getAllDeviceModelsJSON(): Observable<FullDeviceModel[]>{
    let apiURL = 'http://localhost:8080/device-model-management/device-model';
    return this.http.get(apiURL).pipe(
      map(res => {
        return res.json();
      })
    );
  }

  addNewDeviceModel(deviceModelDTO: DeviceModel): Observable<FullDeviceModel>{
    let apiURL = 'http://localhost:8080/device-model-management/device-model';
    return this.http.post(apiURL,deviceModelDTO).pipe(
      map(res => {
        var result = res.json();
          return new FullDeviceModel(
            result.id,
            result.manufacturer,
            result.model,
            result.certificate,
            result.deviceNumPrefix,
            result.fiscalNumPrefix
          );
      })
    );
  }

  updateDeviceModelInfo(deviceModel: DeviceModel,id : number ):Observable<FullDeviceModel>{
    let apiURL = 'http://localhost:8080/device-model-management/device-model/'+id;
    return this.http.put(apiURL,deviceModel).pipe(
      map(res => {
        var result = res.json();
        return new FullDeviceModel(
          result.id,
          result.manufacturer,
          result.model,
          result.certificate,
          result.deviceNumPrefix,
          result.fiscalNumPrefix
        );
      })
    );
  }
}
