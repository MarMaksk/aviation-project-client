import {Injectable} from "@angular/core";
import {ICRUD} from "../../flight/service/ICRUD";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../models/order";
import {PageableEntity} from "../../user/models/pageableEntity";

@Injectable({
  providedIn: 'root'
})
export class OrderService implements ICRUD<Order> {

  constructor(private http: HttpClient) {
  }

  API: string = 'http://localhost:9000/order/';

  findAllWithPagination(sort: string, direction: string, order: number, page: number): Observable<PageableEntity> {
    return this.http.get<PageableEntity>(this.API + `${sort}/${order}/${page}/${direction}`);
  }

  create(entity: Order): Observable<Order> {
    return this.http.post<Order>(this.API, entity);
  }

  delete(iataCodeAndIcaoCode: any): Observable<void> {
    return this.http.delete<void>(this.API  + iataCodeAndIcaoCode);
  }

  find(productOrderId: number): Observable<Order> {
    return this.http.get<Order>(this.API  + productOrderId);
  }

  update(entity: Order): Observable<Order> {
    return this.http.put<Order>(this.API, entity);
  }
}
