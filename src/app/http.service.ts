import {Injectable} from '@angular/core';
import {bikeStationsJson} from './main/main.component';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {

  }
  getPosts():Observable<bikeStationsJson> {
    return this.http.get<bikeStationsJson>('http://www.poznan.pl/mim/plan/map_service.html?mtype=pub_transport&co=stacje_rowerowe');
  }
}
