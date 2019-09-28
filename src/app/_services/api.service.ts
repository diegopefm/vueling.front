import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Passenger } from '@app/_model/passenger';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })};

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private http: HttpClient) {        
    }

    getManifest(flight: string) {
        return this.http.get<any>(`${environment.apiUrl}/api/manifest/`+flight)
            .pipe(map(passengers => {
                return JSON.stringify(passengers);
            }));
    }

    addPassenger(name: string, surname: string, seat: string, flight: string) { //passenger: Passenger
        return this.http.post<any>(`${environment.apiUrl}/api/manifest/add`, { name, surname, seat, flight })
            .pipe(map(result => {
                return result;
            }));
    }
}