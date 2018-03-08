import { FiltroService } from './filtro.service';
import { ArchivoService } from './archivos.service';
import { EndPoindsURL } from './../common/endpoints.constants';
import { DefaultHeaders } from './../common/header.default';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ResumenService {
    mes: string;
    anio: string;
    constructor(private http: Http, private headers: DefaultHeaders,
    private archivoService: ArchivoService, private filtroService: FiltroService) {
        const fecha = moment();
        this.mes = (fecha.month() + 1).toString();
        this.anio = fecha.year().toString()
    }

    getPeriodo() {
        return this.mes + ' - ' + this.anio;
    }

    getProcesos(): Observable<any> {
        const params: URLSearchParams = new URLSearchParams();
        params.append('n', '3');
        return this.http.get(EndPoindsURL.rProcesos,
            new RequestOptions({ headers: this.headers.getContentAuthHeaders(), params: params }))
            .map(response => response.json())
            .catch(error => error.json());
    }

    getFeriados(): Observable<any> {
        const params: URLSearchParams = new URLSearchParams();
        params.append('mes', this.mes);
        params.append('anio', this.anio);

        return this.http.get(EndPoindsURL.rFeriados,
            new RequestOptions({ headers: this.headers.getContentAuthHeaders(), params: params }))
            .map(response => response.json())
            .catch(error => error.json());
    }

    getResumenOperadoras() {
        const params: URLSearchParams = new URLSearchParams();
        params.append('mes', this.mes);
        params.append('anio', this.anio);

        return this.http.get(EndPoindsURL.rOperadoras,
            new RequestOptions({ headers: this.headers.getContentAuthHeaders(), params: params }))
            .map(response => response.json())
            .catch(error => error.json());
    }
}