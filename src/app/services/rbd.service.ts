import { DefaultHeaders } from './../common/header.default';
import { Rbd, Options, Region } from './../common/interfaces';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, URLSearchParams, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { EndPoindsURL } from './../common/endpoints.constants';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RbdService {
    endPointUrl: string = EndPoindsURL.rbds;
    private options;

    constructor(public router: Router, public http: Http, private headers: DefaultHeaders) {
        this.options = new RequestOptions({ headers: this.headers.getContentAuthHeaders() });
    }

    public getRbds(optionsPagination, filtro): Observable<any> {
        const params: URLSearchParams = new URLSearchParams();
        params.append('first', optionsPagination.first);
        params.append('rows', optionsPagination.rows);
        params.append('sortField', optionsPagination.sortField);
        params.append('sortOrder', optionsPagination.sortOrder);
        params.append('rbd', filtro.rbd);
        params.append('nombre', filtro.nombre);
         params.append('region', filtro.region);
        params.append('comuna', filtro.comuna);
        const options = new RequestOptions({ headers: this.headers.getContentAuthHeaders(),
            params: params });
        return this.http.get(this.endPointUrl, options)
            .map(response => response.json())
            .catch(error => error.json());
    }
    public getRbd(id: number): Observable<any> {
        return this.http.get(this.endPointUrl + '/' + id, this.options)
            .map(response => response.json())
            .catch(error => error.json());
    }
    public saveRbd(rbd: Rbd): Observable<any> {
        return this.http.post(this.endPointUrl, rbd, this.options)
            .map(response => response.json())
            .catch(error => error.json());
    }
    public deleteRbd(rbd: Rbd): Observable<any> {
        return this.http.delete(this.endPointUrl + '/' + rbd.rbdId, this.options)
            .map(response => response.json())
            .catch(error => error.json());
    }
}