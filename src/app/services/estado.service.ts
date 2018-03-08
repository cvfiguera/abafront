import { DefaultHeaders } from './../common/header.default';
import { Estado } from './../common/interfaces';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, URLSearchParams, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { EndPoindsURL } from './../common/endpoints.constants';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class EstadoService {
    private endPointUrl: string = EndPoindsURL.estados;

    constructor(public router: Router, public http: Http, private headers: DefaultHeaders) {}

    public getEstados(tipo): Observable<any> {
        let param: URLSearchParams = new URLSearchParams();
        param.append('tipo', tipo);
        let options = new RequestOptions({ headers: this.headers.getContentAuthHeaders(),
            params: param });
        return this.http.get(this.endPointUrl, options)
            .map(response => response.json())
            .catch(error => error.json());
    }
    public getEstado(id: number, tipo): Observable<any> {
        let param: URLSearchParams = new URLSearchParams();
        param.append('tipo', tipo);
        let options = new RequestOptions({ headers: this.headers.getContentAuthHeaders(),
            params: param });
        return this.http.get(this.endPointUrl + '/' + id, options)
            .map(response => response.json())
            .catch(error => error.json());
    }
    public saveEstado(estado, tipo): Observable<any> {
        let param: URLSearchParams = new URLSearchParams();
        param.append('tipo', tipo);
        let options = new RequestOptions({ headers: this.headers.getContentAuthHeaders(),
            params: param });
        return this.http.post(this.endPointUrl, estado, options)
            .map(response => response.json())
            .catch(error => error.json());
    }
    public deleteEstado(estado, tipo): Observable<any> {
        let param: URLSearchParams = new URLSearchParams();
        param.append('tipo', tipo);
        let options = new RequestOptions({ headers: this.headers.getContentAuthHeaders(),
            params: param });
        return this.http.delete(this.endPointUrl + '/' + estado.estadoId, options)
            .map(response => response.json())
            .catch(error => error.json());
    }
}