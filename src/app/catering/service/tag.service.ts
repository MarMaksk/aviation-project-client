import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Tag} from "../models/tag";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  API: string = 'http://localhost:8080/flight-catering/tag/';

  constructor(private http: HttpClient) {
  }

  findAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.API)
  }

}
