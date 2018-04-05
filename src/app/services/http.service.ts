import {Injectable} from '@angular/core';
import {BikeStationsJson} from '../app.models';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {

  }
  getPosts(): Observable<BikeStationsJson> {
    return this.http.get<BikeStationsJson>('http://www.poznan.pl/mim/plan/map_service.html?mtype=pub_transport&co=stacje_rowerowe');
  }
}
