import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const UTIL_API = 'http://localhost:8080/flight-order/util/'


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) {
  }

  checkStatus(productOrderId: string): Observable<String> {
    return this.http.get<String>(UTIL_API + productOrderId)
  }

}
