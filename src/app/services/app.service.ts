import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Doctor} from "src/app/models/doctor.model";
import {DoctorEntity} from "src/app/models/entities/doctorEntity";
import {ObjectMapper} from "json-object-mapper";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _http: HttpClient) {
  }

  public getDoctors(): Observable<Doctor[]> {
    return this._http.get<DoctorEntity[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(map((doctors: DoctorEntity[]) => ObjectMapper.deserializeArray(Doctor, doctors.map(doc => ({
        city: doc.address?.city,
        ...doc
      })))))
  }
}
