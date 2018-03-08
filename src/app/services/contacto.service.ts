import { DefaultHeaders } from './../common/header.default';
import { Contacto } from './../common/interfaces';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, URLSearchParams, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { EndPoindsURL } from './../common/endpoints.constants';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactoService {
    private endPointUrl: string = EndPoindsURL.rbds;

    constructor(private http: Http, private headers: DefaultHeaders) {}

    public getContactos(id: number): Observable<any> {
        const options = new RequestOptions({ headers: this.headers.getContentAuthHeaders() });
        return this.http.get(this.endPointUrl + '/' + id + '/contactos', options)
            .map(response => response.json())
            .catch(error => error.json());
    }
    public getContacto(id, contactoId): Observable<any> {
        const options = new RequestOptions({ headers: this.headers.getContentAuthHeaders() });
        return this.http.get(this.endPointUrl + '/' + id + '/contactos/' + contactoId, options)
            .map(response => response.json())
            .catch(error => error.json());
    }
    public saveContacto(id, contacto: Contacto): Observable<any> {
        const options = new RequestOptions({ headers: this.headers.getContentAuthHeaders() });
        return this.http.post(this.endPointUrl + '/' + id + '/contactos', contacto, options)
            .map(response => response.json())
            .catch(error => error.json());
    }
    public deleteContacto(id, contacto: Contacto): Observable<any> {
        const options = new RequestOptions({ headers: this.headers.getContentAuthHeaders() });
        return this.http.delete(this.endPointUrl  + '/' + id + '/contactos/' + contacto.contactoId, options)
            .map(response => response.json())
            .catch(error => error.json());
    }
}