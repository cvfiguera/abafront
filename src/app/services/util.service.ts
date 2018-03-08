import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class UtilService {

    constructor() {}

    ConverDateToFormat(date: string): string {
        if ((date != '') && (date != null)) {
            return moment(date).format('YYYY-MM-DD');
        } else {
            return '';
        }
    }

    getNombreMes(mes) {
        switch (mes) {
            case '01':
            case 1: return 'Enero';
            case '02':
            case 2: return 'Febrero';
            case '03':
            case 3: return 'Marzo';
            case '04':
            case 4: return 'Abril';
            case '05':
            case 5: return 'Mayo';
            case '06':
            case 6: return 'Junio';
            case '07':
            case 7: return 'Julio';
            case '08':
            case 8: return 'Agosto';
            case '09':
            case 9: return 'Septiembre';
            case '10':
            case 10: return 'Octubre';
            case '11':
            case 11: return 'Noviembre';
            case '12':
            case 12: return 'Diciembre';
            default: return 'Error';
        }
    }
}