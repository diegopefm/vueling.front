import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private http: HttpClient) {
    }

    getManifest(flight: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/manifest/getmanifest`, { flight })
            .pipe(map(passengers => {
                return passengers;
            }));
    }
}