import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
    token: string = '';
    httpOptions: any;
    headers: any;

    constructor(private http: HttpClient) {
        
    }

    getManifest(flight: string) {
        return this.http.get<any>(`${environment.apiUrl}/api/manifest/`+flight)
            .pipe(map(passengers => {
                return JSON.stringify(passengers);
            }));
    }

    addPassenger(name: string, surname: string, seat: string, flight: string) {

        this.token = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token;
        // this.httpOptions = {
        //     headers: new HttpHeaders({
        //         'Authorization': this.token,
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Credentials': 'true',
        //         'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name',
        //         'Access-Control-Allow-Methods': 'POST,GET,PUT,PATCH,DELETE,OPTIONS'
        //     })};

        this.headers = new HttpHeaders({
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name',
            'Access-Control-Allow-Methods': 'POST,GET,PUT,PATCH,DELETE,OPTIONS'
        });

        return this.http.post<any>(`${environment.apiUrl}/api/manifest/add`, { name, surname, seat, flight }, { headers: this.headers })
            .pipe(map(result => {
                return result;
            }));
    }
}