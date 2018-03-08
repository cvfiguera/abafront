import { EndPoindsURL } from './../common/endpoints.constants';
import { DefaultHeaders } from './../common/header.default';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ReportesService {
    endPointURL = EndPoindsURL.reporteRegiones;
    constructor(private http: Http, private headers: DefaultHeaders) {}

    getRegiones(filtro: any): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.append('mesi', filtro.mesIni);
        params.append('mesf', filtro.mesFin);
        params.append('anioi', filtro.anioIni);
        params.append('aniof', filtro.anioFin);

        return this.http.get(this.endPointURL,
            new RequestOptions({ headers: this.headers.getContentAuthHeaders(), params: params }))
            .map(response => response.json())
            .catch(error => error.json());
    }

    getRegionesDetalle(filtro: any, id: number, tipo: string): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        params.append('mesi', filtro.mesIni);
        params.append('mesf', filtro.mesFin);
        params.append('anioi', filtro.anioIni);
        params.append('aniof', filtro.anioFin);
        return this.http.get(this.endPointURL + '/' + id + '/' + tipo,
        new RequestOptions({ headers: this.headers.getContentAuthHeaders(), params: params }))
            .map(response => response.json())
            .catch(error => error.json());
    }

    getDetalleMeses(mes, anio, region) {
        let params: URLSearchParams = new URLSearchParams();
        params.append('mes', mes);
        params.append('anio', anio);
        return this.http.get(this.endPointURL + '/' + region + '/meses/' + anio + '' + mes,
        new RequestOptions({ headers: this.headers.getContentAuthHeaders(), params: params }))
            .map(response => response.json())
            .catch(error => error.json());
    }

    getDetalleOperadora(filtro: any, region, operadora) {
        let params: URLSearchParams = new URLSearchParams();
        params.append('mesi', filtro.mesIni);
        params.append('mesf', filtro.mesFin);
        params.append('anioi', filtro.anioIni);
        params.append('aniof', filtro.anioFin);

        return this.http.get(this.endPointURL + '/' + region + '/operadoras/' + operadora,
        new RequestOptions({ headers: this.headers.getContentAuthHeaders(), params: params }))
            .map(response => response.json())
            .catch(error => error.json());
    }
}