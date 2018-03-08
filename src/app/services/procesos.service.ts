import { DefaultHeaders } from './../common/header.default';
import { EndPoindsURL } from './../common/endpoints.constants';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ProcesosService {
    private endPoindUrl = EndPoindsURL.procesos;
    constructor(private http: Http, private headers: DefaultHeaders) {}

    getProcesos(fechaIni, fechaFin): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.append('fechaIni', fechaIni);
        params.append('fechaFin', fechaFin);

        return this.http.get(this.endPoindUrl,
            new RequestOptions( { headers: this.headers.getContentAuthHeaders(), params: params } ))
            .map(response => response.json())
            .catch(error => error.json());
    }

    getDetalleProceso(id: number): Observable<any> {
        return this.http.get(this.endPoindUrl + '/' + id + '/detalle',
        new RequestOptions( { headers: this.headers.getContentAuthHeaders() } ))
            .map(response => response.json())
            .catch(error => error.json());
    }
}