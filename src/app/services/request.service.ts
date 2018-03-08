import { DefaultHeaders } from './../common/header.default';
import { Observable } from 'rxjs/Rx';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RequestService {

    constructor(private http: Http, private headers: DefaultHeaders) {}

    getAll(endPointUrl: string, params?: URLSearchParams): Observable<any> {
        return this.http.get(endPointUrl,
            new RequestOptions({ headers: this.headers.getContentAuthHeaders(),
                params: params }))
            .map(response => response.json())
            .catch(error => error.json());
    }
    getOne(endPointUrl: string, id: number, param?: URLSearchParams): Observable<any> {
        return this.http.get(endPointUrl + '/' + id,
        new RequestOptions({ headers: this.headers.getContentAuthHeaders(), params: param  }))
            .map(response => response.json())
            .catch(error => error.json());
    }
    saveOrUpdate(endPointUrl: string, object: any, param?: URLSearchParams): Observable<any> {
        return this.http.post(endPointUrl, object,
            new RequestOptions({ headers: this.headers.getContentAuthHeaders(), params: param  }))
            .map(response => response.json())
            .catch(error => error.json());
    }
    delete(endPointUrl: string, id: number, param?: URLSearchParams): Observable<any> {
        return this.http.delete(endPointUrl + '/' + id,
        new RequestOptions({ headers: this.headers.getContentAuthHeaders(), params: param  }))
            .map(response => response.json())
            .catch(error => error.json());
    }
}