import { Observable } from 'rxjs/Rx';
import { ServerMessage } from './../shared/server-message';
import { Server } from './../shared/Server';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';

@Injectable()
export class ServerService {

  constructor(private _http: Http) {
    this.headers = new Headers({
      'Content-Type' : 'application/json',
      'Accept' : 'q=0.8;application/json;1=0.9'
    });

    this.options = new RequestOptions({
      headers: this.headers
    });
  }

  options: RequestOptions;
  headers: Headers;

  getServers(): Observable<Server[]> {
    return this._http.get('http://localhost:5000/api/server')
      .map( res => res.json())
      .catch(this.handleError);
  }

  handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    console.log(errMsg);
    return Observable.throw(errMsg);
  }

  handleServerMessage(msg: ServerMessage): Observable<Response> {
    const url = 'http://localhost:5000/api/server/' + msg.id;
    return this._http.put(url, msg, this.options).map(res => res.json());
  }
}
