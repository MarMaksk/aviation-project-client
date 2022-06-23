import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {
  }

  API: string = 'http://localhost:9000/report/';

  deliverInvoice(productOrderId: string): Observable<any> {
    return this.http.get<any>(this.API + 'deliver/' + productOrderId,
      {
        observe: 'body',
        // @ts-ignore
        responseType: "blob"
      });
  }

  catererReport(productOrderId: string, responsible: string, email: string): Observable<any> {
    return this.http.get<any>(this.API + 'caterer/' + productOrderId + '/' + responsible + '/' + email,
      {
        observe: 'body',
        // @ts-ignore
        responseType: "blob"
      })
  }

}
