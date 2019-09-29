import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
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

        this.headers = new HttpHeaders({
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token,
            'Content-Type': 'application/json'
        });

        return this.http.post<any>(`${environment.apiUrl}/api/manifest/add`, { name, surname, seat, flight }, { headers: this.headers })
            .pipe(map(result => {
                return result;
            }));
    }
}