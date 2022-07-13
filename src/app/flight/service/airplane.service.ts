import {Injectable} from '@angular/core';
import {ICRUD} from "./ICRUD";
import {Airplane} from "../models/airplane";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PageableEntity} from "../../user/models/pageableEntity";

@Injectable({
  providedIn: 'root'
})
export class AirplaneService implements ICRUD<Airplane> {

  constructor(private http: HttpClient) {
  }

  API: string = 'http://localhost:8080/flight-order/airplane/';

  findAllWithPagination(sort: string, direction: string, order: number, page: number): Observable<PageableEntity> {
    return this.http.get<PageableEntity>(this.API + `${sort}/${order}/${page}/${direction}`);
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

  delete(icaoCode: any): Observable<void> {
    return this.http.delete<void>(this.API + icaoCode);
  }

  find(icaoCode: any): Observable<Airplane> {
    return this.http.get<Airplane>(this.API + icaoCode);
  }

  update(entity: Airplane): Observable<Airplane> {
    return this.http.put<Airplane>(this.API, entity);
  }

  equalsByIata(o1: Airplane, o2: Airplane): boolean {
    return o1.icaoCode === o2.icaoCode;
  }

}
