import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import {CLIENT_APP_CONFIG} from '../common/client.config.constants';

@Injectable()
export class DefaultHeaders {
    contentAuthHeaders= new Headers();

    constructor(public authService: AuthService) {}

    public getContentAuthHeaders(): Headers {
        if (this.authService.isTokenExpired()) {
            this.authService.refreshToken();
        }
        if (localStorage.getItem('access_token')) {
            this.contentAuthHeaders.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
            return this.contentAuthHeaders;
        } else {
            
        }
    }
}

