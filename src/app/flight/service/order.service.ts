import {Injectable} from "@angular/core";
import {ICRUD} from "./ICRUD";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../models/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService implements ICRUD<Order> {

  constructor(private http: HttpClient) {
  }

  API: string = 'http://localhost:8080/avia/catering/order/';

  create(entity: Order): Observable<Order> {
    return this.http.post<Order>(this.API + 'create', entity);
  }

  delete(iataCodeAndIcaoCode: any): Observable<void> {
    return this.http.delete<void>(this.API + 'delete/' + iataCodeAndIcaoCode);
    ;
  }

  find(iataCodeAndIcaoCode: any): Observable<Order> {
    return this.http.get<Order>(this.API + 'get/' + iataCodeAndIcaoCode);
  }

  update(entity: Order): Observable<Order> {
    return this.http.put<Order>(this.API + 'update/', entity);
  }
}
