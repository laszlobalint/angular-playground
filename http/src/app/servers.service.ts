import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable()
export class ServerService {
  constructor(private http: Http) { }
  storeServers(servers: any[]) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    //   return this.http.post('https://http-project-9ba99.firebaseio.com/data.json', servers, {headers: headers});
    // }
    return this.http.put('https://http-project-9ba99.firebaseio.com/data.json', servers, { headers: headers });
  }

  getServers() {
    return this.http.get('https://http-project-9ba99.firebaseio.com/data.json').map(
      (response: Response) => {
        const data = response.json();
        for (const server of data) {
          server.name = 'FETCHED_' + server.name;
        }
        return data;
      }
    )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong!');
        }
      );
  }

  getAppName() {
    return this.http.get('https://http-project-9ba99.firebaseio.com/appName.json')
    .map(
      (response: Response) => {
        return response.json();
      }
    );
  }
}