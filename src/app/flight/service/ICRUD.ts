import {Observable, Observer} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface ICRUD<F> {

  API: string;

  create(entity: F): Observable<F>;

  update(entity: F): Observable<F>;

  delete(uniqueId: any, any?: any): Observable<void>;

  find(uniqueId: any, any?: any): Observable<F>;

}
