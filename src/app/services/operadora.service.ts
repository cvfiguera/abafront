import { DefaultHeaders } from './../common/header.default';
import { EndPoindsURL } from './../common/endpoints.constants';
import { Operadora, Options, OperadoraFiltro } from './../common/interfaces';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, URLSearchParams, Response, RequestOptions, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class OperadoraService {

    private endPointUrl = EndPoindsURL.operadoras;
    private options;

    constructor(public router: Router, public http: Http, private headers: DefaultHeaders) {
        this.options = new RequestOptions({ headers: headers.getContentAuthHeaders() });
    }

    public getOperadoras(optionsPagination, filtro): Observable<any> {
        const params: URLSearchParams = new URLSearchParams();
        params.append('first', optionsPagination.first);
        params.append('rows', optionsPagination.rows);
        params.append('sortField', optionsPagination.sortField);
        params.append('sortOrder', optionsPagination.sortOrder);
        params.append('rut', filtro.rut);
        params.append('nombre', filtro.nombre);

        const options = new RequestOptions({ headers: this.headers.getContentAuthHeaders(),
            params: params });
        return this.http.get(this.endPointUrl, options)
            .map(response => response.json())
            .catch(error => error.json());
    }

    public getOperadora(id: number): Observable<any> {
        return this.http.get(this.endPointUrl + '/' + id, this.options)
            .map(response => response.json())
            .catch(error => error.json());
    }

    public saveOperadora(operadora: Operadora): Observable<any> {
        return this.http.post(this.endPointUrl, operadora, this.options)
            .map(response => response.json())
            .catch(error => error.json());
    }

    public deleteOperadora(operadora: Operadora): Observable<any> {
        return this.http.delete(this.endPointUrl + '/' + operadora.operadoraId, this.options)
            .map(response => response.json())
            .catch(error => error.json());
    }

    public getDataOperadorasFilter(endPointUrl: string, rut: string, nombre: string): Observable<any> {
        const params: URLSearchParams = new URLSearchParams();
        params.append('rut', rut);
        params.append('nombre', nombre);

        const options = new RequestOptions({ headers: this.headers.getContentAuthHeaders(),
            params: params });
        return this.http.get(endPointUrl, options)
            .map(response => response.json())
            .catch(error => error.json());
    }
}