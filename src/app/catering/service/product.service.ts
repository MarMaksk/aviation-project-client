import {Injectable} from "@angular/core";
import {ICRUD} from "../../flight/service/ICRUD";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product";
import {PageableEntity} from "../../user/models/pageableEntity";

@Injectable({
  providedIn: 'root'
})
export class ProductService implements ICRUD<Product> {

  constructor(private http: HttpClient) {
  }

  API: string = 'http://localhost:8080/flight-catering/product/';

  findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API);
  }

  findAllForOrder(icaoCode: string, iataCode: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.API + `${icaoCode}/${iataCode}`);
  }

  findAllWithPagination(sort: string, direction: string, order: number, page: number): Observable<PageableEntity> {
    return this.http.get<PageableEntity>(this.API + `${sort}/${order}/${page}/${direction}`);
  }

  create(entity: Product): Observable<Product> {
    return this.http.post<Product>(this.API, entity);
  }

  delete(code: any): Observable<void> {
    return this.http.delete<void>(this.API + code);
    ;
  }

  find(code: any): Observable<Product> {
    return this.http.get<Product>(this.API + code);
  }

  update(entity: Product): Observable<Product> {
    return this.http.put<Product>(this.API, entity);
  }
}
