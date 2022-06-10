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
    return this.http.get<PageableEntity>(this.API + `getAll/${sort}/${order}/${page}/${direction}`);
  }

  findAll(): Observable<Airplane[]> {
    return this.http.get<Airplane[]>(this.API + 'getAll')
  }

  findAllNoBusy(): Observable<Airplane[]> {
    return this.http.get<Airplane[]>(this.API + 'getAllNoBusy');
  }

  create(entity: Airplane): Observable<Airplane> {
    return this.http.post<Airplane>(this.API + 'create/', entity);
  }

  delete(iataCode: any): Observable<void> {
    return this.http.delete<void>(this.API + 'delete/' + iataCode);
  }

  find(iataCode: any): Observable<Airplane> {
    return this.http.get<Airplane>(this.API + 'get/' + iataCode);
  }

  update(entity: Airplane): Observable<Airplane> {
    return this.http.put<Airplane>(this.API + 'update/', entity);
  }

  equalsByIata(o1: Airplane, o2: Airplane): boolean {
    return o1.iataCode === o2.iataCode;
  }

}
