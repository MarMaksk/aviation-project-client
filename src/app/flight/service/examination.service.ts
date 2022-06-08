import {Injectable} from '@angular/core';
import {ICRUD} from "./ICRUD";
import {Examination} from "../models/examination";
import {Observable, Observer} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ExaminationService implements ICRUD<Examination> {

  constructor(private http: HttpClient) {
  }

  API: string = 'http://localhost:9001/examination/';

  create(entity: Examination): Observable<Examination> {
    return this.http.post<Examination>(this.API + 'create', entity)
  }

  delete(date: Date, iataCode: string): Observable<void> {
    let params = new HttpParams();
    params = params.append('iataCode', iataCode)
    params = params.append('date', date.toDateString())
    return this.http.delete<void>(this.API + 'delete/', {
      params
    });
  }

  find(date: Date, iataCode: string): Observable<Examination> {
    let params = new HttpParams();
    params = params.append('iataCode', iataCode)
    params = params.append('date', date.toDateString())
    return this.http.get<Examination>(this.API + 'get', {
      params
    });
  }

  findAllByIata(iataCode: string): Observable<Examination> {
    return this.http.get<Examination>(this.API + 'getAllByIata/' + iataCode);
  }

  findAll(): Observable<Examination[]> {
    return this.http.get<Examination[]>(this.API + 'getAll/');
  }

  update(entity: Examination): Observable<Examination> {
    return this.http.put<Examination>(this.API + 'update', entity);
  }


}
