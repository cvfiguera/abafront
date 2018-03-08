import { DefaultHeaders } from './../common/header.default';
import { Operadora, Validador } from './../common/interfaces';
import { EndPoindsURL } from './../common/endpoints.constants';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, URLSearchParams, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ArchivoService {
     constructor(public router: Router, public http: Http, private headers: DefaultHeaders) {}
     ///////////////////////////////////** VALIDACION ***/////////////////////////////////////
     public esValido(archivo): Observable<any> {
         return this.http.post(EndPoindsURL.validadorEsValido, archivo,
            new RequestOptions({ headers: this.headers.getContentAuthHeaders() }))
            .map(response => response.json())
            .catch(error => error.json());
     }
     public getNoValidados(filtro): Observable<any> {
        return this.http.post(EndPoindsURL.validadorSftp, filtro,
            new RequestOptions({ headers: this.headers.getContentAuthHeaders() }))
            .map(response => response.json())
            .catch(error => error.json());
     }
     public validarArchivos(validador: Validador): Observable<any> {
        return this.http.post(EndPoindsURL.validador, validador,
            new RequestOptions({ headers: this.headers.getContentAuthHeaders() }))
            .map(response => response.json())
            .catch(error => error.json());
     }
     public getEstatus(): Observable<any> {
         return this.http.get(EndPoindsURL.validadorStatus,
            new RequestOptions( { headers: this.headers.getContentAuthHeaders() }))
            .map(response => response.json())
            .catch(error => error.json());
     }
     ///////////////////////////////////** CARGA ***/////////////////////////////////////
     public getProcesoActivo(): Observable<any> {
         const params: URLSearchParams = new URLSearchParams();
         params.append('usuario', '1');
         return this.http.get(EndPoindsURL.procesoActivo,
            new RequestOptions({ headers: this.headers.getContentAuthHeaders(), params: params }))
            .map(response => response.json())
            .catch(error => error.json());
     }
     public getValidados(filtro): Observable<any> {
         const params: URLSearchParams = new URLSearchParams();
         params.append('operadora', filtro.operadora);
         params.append('month', filtro.mes);
         params.append('year', filtro.year);
         return this.http.get(EndPoindsURL.cargador,
            new RequestOptions({ headers: this.headers.getContentAuthHeaders(), params: params }))
            .map(response => response.json())
            .catch(error => error.json());
    }
    public getBitacoras(filtro): Observable<any> {
        return this.http.post(EndPoindsURL.subtel, filtro,
            new RequestOptions({ headers: this.headers.getContentAuthHeaders() }))
           .map(response => response.json())
           .catch(error => error.json());
    }
    public cargarBitacoras(archivo): Observable<any> {
        const params: URLSearchParams = new URLSearchParams();
        params.append('usuario', '1');
        return this.http.post(EndPoindsURL.bitacora, archivo,
            new RequestOptions( { headers: this.headers.getContentAuthHeaders(), params: params } ))
            .map(response => response.json())
            .catch(error => error.json());
     }
     public cargarArchivos(cargador: any[]): Observable<any> {
        const params: URLSearchParams = new URLSearchParams();
        params.append('usuario', '1');
        return this.http.post(EndPoindsURL.cargador, cargador,
            new RequestOptions( { headers: this.headers.getContentAuthHeaders(), params: params } ))
            .map(response => response.json())
            .catch(error => error.json());
     }
     public getEstatusCarga(): Observable<any> {
         return this.http.get(EndPoindsURL.cargadorStatus,
            new RequestOptions( { headers: this.headers.getContentAuthHeaders() } ))
            .map(response => response.json())
            .catch(error => error.json());
     }
     ////////////////////////////////////FACTURACIÓN/////////////////////////////////////////
    public getFacturados(filtro): Observable<any> {
        return this.http.post(EndPoindsURL.facturador, filtro,
           new RequestOptions({ headers: this.headers.getContentAuthHeaders() }))
           .map(response => response.json())
           .catch(error => error.json());
    }
}