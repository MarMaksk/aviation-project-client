import {Injectable} from '@angular/core';
import {ICRUD} from "./ICRUD";
import {Examination} from "../models/examination";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PageableEntity} from "../../user/models/pageableEntity";

@Injectable({
  providedIn: 'root'
})
export class ExaminationService implements ICRUD<Examination> {

  API: string = 'http://localhost:9001/examination/';

  constructor(private http: HttpClient) {
  }

  findAllWithPagination(sort: string, direction: string, order: number, page: number): Observable<PageableEntity> {
    return this.http.get<PageableEntity>(this.API + `${sort}/${order}/${page}/${direction}`);
  }

  create(entity: Examination): Observable<Examination> {
    return this.http.post<Examination>(this.API, entity)
  }

  delete(date: Date, iataCode: string): Observable<void> {
    let params = new HttpParams();
    params = params.append('iataCode', iataCode)
    params = params.append('date', date.toDateString())
    return this.http.delete<void>(this.API, {
      params
    });
  }

  find(date: Date, iataCode: string): Observable<Examination> {
    let params = new HttpParams();
    params = params.append('iataCode', iataCode)
    params = params.append('date', date.toDateString())
    return this.http.get<Examination>(this.API, {
      params
    });
  }

  findAllByIata(iataCode: string): Observable<Examination> {
    return this.http.get<Examination>(this.API + 'getAllByIata/' + iataCode);
  }

  findAll(): Observable<Examination[]> {
    return this.http.get<Examination[]>(this.API);
  }

  update(entity: Examination): Observable<Examination> {
    return this.http.put<Examination>(this.API + 'update', entity);
  }


}
