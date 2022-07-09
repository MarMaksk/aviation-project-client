import {Injectable} from '@angular/core';
import {ICRUD} from "./ICRUD";
import {Airport} from "../models/airport";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageableEntity} from "../../user/models/pageableEntity";

@Injectable({
  providedIn: 'root'
})
export class AirportService implements ICRUD<Airport> {

  constructor(private http: HttpClient) {
  }

  API: string = 'http://localhost:9001/airport/';

  findAllWithPagination(sort: string, direction: string, order: number, page: number): Observable<PageableEntity> {
    return this.http.get<PageableEntity>(this.API + `${sort}/${order}/${page}/${direction}`);
  }

  findAll(): Observable<Airport[]> {
    return this.http.get<Airport[]>(this.API);
  }

  create(entity: Airport): Observable<Airport> {
    return this.http.post<Airport>(this.API, entity);
  }

  delete(iataCode: any): Observable<void> {
    return this.delete(this.API + iataCode);
  }

  find(uniqueId: any): Observable<Airport> {
    return this.http.get<Airport>(this.API + uniqueId);
  }

  update(entity: Airport): Observable<Airport> {
    return this.http.put<Airport>(this.API, entity);
  }



}


