import {Injectable} from '@angular/core';
import {ICRUD} from "./ICRUD";
import {Airport} from "../models/airport";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Airplane} from "../models/airplane";
import {PageableEntity} from "../../user/models/pageableEntity";

@Injectable({
  providedIn: 'root'
})
export class AirportService implements ICRUD<Airport> {

  constructor(private http: HttpClient) {
  }

  API: string = 'http://localhost:9001/airport/';

  findAllWithPagination(sort: string, direction: string, order: number, page: number): Observable<PageableEntity> {
    return this.http.get<PageableEntity>(this.API + `getAll/${sort}/${order}/${page}/${direction}`);
  }

  findAll(): Observable<Airport[]> {
    return this.http.get<Airport[]>(this.API + 'getAll');
  }

  create(entity: Airport): Observable<Airport> {
    return this.http.post<Airport>(this.API + 'create', entity);
  }

  delete(iataCode: any): Observable<void> {
    return this.delete(this.API + 'delete/');
  }

  find(uniqueId: any): Observable<Airport> {
    return this.http.get<Airport>(this.API + 'get/' + uniqueId);
  }

  update(entity: Airport): Observable<Airport> {
    return this.http.put<Airport>(this.API + 'update/', entity);
  }
}
