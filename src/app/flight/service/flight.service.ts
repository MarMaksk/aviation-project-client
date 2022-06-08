import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Flight} from "../models/flight";
import {Observable} from "rxjs";
import {ICRUD} from "./ICRUD";

@Injectable({
  providedIn: 'root'
})
export class FlightService implements ICRUD<Flight> {
// URL для gateway
  // API: string = 'http://localhost:8080/avia/order/flight/';
  API: string = 'http://localhost:9001/flight/';
  constructor(private http: HttpClient) {
  }

  create(entity: Flight): Observable<Flight> {
    return this.http.post<Flight>(this.API + 'create', entity)
  }

  delete(flightNumber: any): Observable<void> {
    return this.http.delete<void>(this.API + 'delete/' + flightNumber)
  }

  find(flightNumber: any): Observable<Flight> {
    return this.http.get<Flight>(this.API + 'get/' + flightNumber)
  }

  update(entity: Flight): Observable<Flight> {
    return this.http.put<Flight>(this.API + 'update', entity)
  }

  findAllFlight(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.API + 'getAll')
  }

}
