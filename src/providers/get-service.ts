import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

//let apiUrl = 'http://ionicapplication.j.layershift.co.uk/';
//let apiUrl = 'http://localhost/PHP-Slim-Restful/api/';
//let apiUrl = '../api/';


let apiUrl = 'https://onthantilemobileapplication.j.layershift.co.uk/';


@Injectable()
export class GetService {

  constructor(public http : Http) {
    console.log('Hello Get Service Provider');
  }

  postgetData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers(/*{
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
      'Access-Control-Allow-Credentials': true
    }*/);

      this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

}

//npm install --save --save-exact ionic@3.6.0
