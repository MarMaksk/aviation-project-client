import {Injectable} from "@angular/core";
import {ICRUD} from "./ICRUD";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService implements ICRUD<Product> {

  constructor(private http: HttpClient) {
  }

  API: string = 'http://localhost:8080/avia/catering/product/';

  create(entity: Product): Observable<Product> {
    return this.http.post<Product>(this.API + 'create', entity);
  }

  delete(code: any): Observable<void> {
    return this.http.delete<void>(this.API + 'delete/' + code);
    ;
  }

  find(code: any): Observable<Product> {
    return this.http.get<Product>(this.API + 'get/' + code);
  }

  update(entity: Product): Observable<Product> {
    return this.http.put<Product>(this.API + 'update/', entity);
  }
}
