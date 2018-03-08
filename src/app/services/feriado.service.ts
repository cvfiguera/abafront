import { DefaultHeaders } from './../common/header.default';
import { Feriado } from './../common/interfaces';
import { RequestOptions, Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { EndPoindsURL } from './../common/endpoints.constants';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'

@Injectable()
export class FeriadoService {
    private endPointUrl = EndPoindsURL.feriados;

    constructor(private http: Http, private headers: DefaultHeaders) {}

    public getFeriados(): Observable<any> {
        let options = new RequestOptions({ headers: this.headers.getContentAuthHeaders() });
        return this.http.get(this.endPointUrl, options)
            .map(response => response.json())
            .catch(error => error.json());
    }
    public getFeriado(id) {
        let params: URLSearchParams = new URLSearchParams();
        return this.http.get(this.endPointUrl + '/' + id,
        new RequestOptions({ headers: this.headers.getContentAuthHeaders(), params: params }))
            .map(response => response.json())
            .catch(error => error.json());
    }
    public saveFeriado(feriado: Feriado) {
        return this.http.post(this.endPointUrl, feriado,
            new RequestOptions({ headers: this.headers.getContentAuthHeaders() }))
            .map( response => response.json() )
            .catch( error => error.json() );
    }
    public deleteFeriado(feriado: Feriado) {
        return this.http.delete(this.endPointUrl + '/' + feriado.id,
        new RequestOptions({ headers: this.headers.getContentAuthHeaders() }))
        .map( response => response.json() )
        .catch( error => error.json() );
    }
}