import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Flight} from "../models/flight";
import {Observable} from "rxjs";
import {ICRUD} from "./ICRUD";

@Injectable({
  providedIn: 'root'
})
export class FlightService implements ICRUD<Flight> {

  API: string = 'http://localhost:8080/flight-order/flight/';

  constructor(private http: HttpClient) {
  }

  selectAlternativeFlight(flightNumber: string, flightNumberAlternative: string): Observable<void> {
    return this.http.get<void>(this.API + 'alternativeFlight/' + flightNumber + '/' + flightNumberAlternative);
  }

  findAlternativeFlights(flightNumber: string): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.API + 'alternativeFlights/' + flightNumber)
  }

  create(entity: Flight): Observable<Flight> {
    return this.http.post<Flight>(this.API, entity)
  }

  delete(flightNumber: any): Observable<void> {
    return this.http.delete<void>(this.API + flightNumber)
  }

  find(flightNumber: string): Observable<Flight> {
    return this.http.get<Flight>(this.API + flightNumber)
  }

  update(entity: Flight): Observable<Flight> {
    return this.http.put<Flight>(this.API, entity)
  }

  findAllFlight(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.API)
  }

}
