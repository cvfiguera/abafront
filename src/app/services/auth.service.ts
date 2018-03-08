import { CLIENT_APP_CONFIG } from './../common/client.config.constants';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, URLSearchParams, Response, RequestOptions, Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

    private oAuthLoginEndPointUrl = '/aba/oauth/token';
    private oAuthLogoutEndPointUrl = '/aba/revoke-token';
    private headers: Headers;

    constructor(public router: Router, public http: Http) {
        this.headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Authorization': 'Basic ' + CLIENT_APP_CONFIG.STORE_ABAADMIN
        });
    }

    public getToken(username, password): Observable<any> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('username', username);
        params.set('password', password);
        params.set('grant_type', 'password');
        return this.http.post(this.oAuthLoginEndPointUrl, params.toString(),
            new RequestOptions( { headers: this.headers,
                withCredentials: true } ))
            .map(this.handleData)
            .catch(this.handleError);
    }

    public refreshToken(): Observable<any> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('grant_type', 'refresh_token');
        params.set('refresh_token', localStorage.getItem('refresh_token'));
        this.removeToken();
        return this.http.post(this.oAuthLoginEndPointUrl, params.toString(),
        new RequestOptions( { headers: this.headers } ))
            .map(this.handleData)
            .catch(this.handleError);
    }

    public removeToken() {
        this.http.delete(this.oAuthLogoutEndPointUrl,
            new RequestOptions( { headers: this.headers } ));
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expires_at');
        return true;
    }

    public isTokenExpired(): boolean {
        if (localStorage.getItem('access_token')) {
            const dateToken = moment(localStorage.getItem('expires_at'));
            if (dateToken.isBefore(moment([]))) {
                this.refreshToken().subscribe(
                    response => {
                        return false;
                    },
                    error => {
                        return true;
                    }
                );
            } else return false;
        }
        return true;
    }

    private handleData(res: Response) {
        const data = res.json();
        const expireDate = moment();
        expireDate.add(1000 * data.expires_in);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('expires_at', expireDate.toString());
        return true;
    }

    private handleError (error: any) {
        const errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}