import {Injectable} from '@angular/core';
import {ICRUD} from "./ICRUD";
import {Airplane} from "../models/airplane";
import {Observable, Observer} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PageableEntity} from "../../user/models/pageableEntity";

@Injectable({
  providedIn: 'root'
})
export class AirplaneService implements ICRUD<Airplane> {

  constructor(private http: HttpClient) {
  }

  API: string = 'http://localhost:9001/airplane/';

  findAllWithPagination(sort: string, direction: string, order: number, page: number): Observable<PageableEntity> {
    return this.http.get<PageableEntity>(this.API + `/${sort}/${order}/${page}/${direction}`);
  }

  findAll(): Observable<Airplane[]> {
    return this.http.get<Airplane[]>(this.API)
  }

  findAllNoBusy(): Observable<Airplane[]> {
    return this.http.get<Airplane[]>(this.API);
  }

  create(entity: Airplane): Observable<Airplane> {
    return this.http.post<Airplane>(this.API, entity);
  }

  delete(iataCode: any): Observable<void> {
    return this.http.delete<void>(this.API + iataCode);
  }

  find(iataCode: any): Observable<Airplane> {
    return this.http.get<Airplane>(this.API + iataCode);
  }

  update(entity: Airplane): Observable<Airplane> {
    return this.http.put<Airplane>(this.API, entity);
  }

  equalsByIata(o1: Airplane, o2: Airplane): boolean {
    return o1.iataCode === o2.iataCode;
  }

}
