import { DefaultHeaders } from './../common/header.default';
import { Observable } from 'rxjs/Rx';
import { EndPoindsURL } from './../common/endpoints.constants';
import { Http, URLSearchParams, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class FiltroService {
    private options;
    constructor(public router: Router, public http: Http, private headers: DefaultHeaders) {
        this.options = new RequestOptions({ headers: headers.getContentAuthHeaders() });
    }

    public getRegiones(): Observable<any> {
        return this.http.get(EndPoindsURL.regiones, this.options)
            .map( response => response.json() )
            .catch( error => error.json() );
    }

    public getConcursos(): Observable<any> {
        return this.http.get(EndPoindsURL.concursos, this.options)
            .map( response => response.json() )
            .catch( error => error.json() );
    }

    public getOperadoras(): Observable<any> {
        return this.http.get(EndPoindsURL.filtrosOperadoras, this.options)
            .map( response => response.json() )
            .catch( error => error.json() );
    }

    public getMonths() {
        return [
            {id: '01', name: 'Enero'},
            {id: '02', name: 'Febrero'},
            {id: '03', name: 'Marzo'},
            {id: '04', name: 'Abril'},
            {id: '05', name: 'Mayo'},
            {id: '06', name: 'Junio'},
            {id: '07', name: 'Julio'},
            {id: '08', name: 'Agosto'},
            {id: '09', name: 'Septiembre'},
            {id: '10', name: 'Octubre'},
            {id: '11', name: 'Noviembre'},
            {id: '12', name: 'Diciembre'}
        ];
     }

     public getYears() {
        let actual = new Date().getFullYear();
        var years = [];

        for (let i = 0; i < 6; i++) {
            let year = {
                id: actual - i, name: actual - i
            };
            years.push(year);
        }
        return years;
     }
}