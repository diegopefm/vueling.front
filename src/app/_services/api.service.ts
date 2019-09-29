import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';
import { Passenger } from '@app/_model/passenger';

@Injectable({ providedIn: 'root' })
export class ApiService {
    headers: any;

    constructor(private http: HttpClient, private router: Router) {
        
    }

    getManifest(flight: string) {
        return this.http.get<any>(`${environment.apiUrl}/api/manifest/`+flight)
            .pipe(map(passengers => {
                return JSON.stringify(passengers);
            }));
    }

    addPassenger(name: string, surname: string, seat: string, flight: string) {

        let url = `${environment.apiUrl}/api/manifest/search/`+name+`/`+surname+`/`+seat;

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //if (currentUser==null) this.router.navigate(['/login']); //=> TODO: Redirect to login

        this.headers = new HttpHeaders({
            'Authorization': 'Bearer ' + currentUser.token,
            'Content-Type': 'application/json'
        });

        return this.http.post<any>(`${environment.apiUrl}/api/manifest/add`, { name, surname, seat, flight }, { headers: this.headers })
            .pipe(map(result => {
                return result;
            }));
    }

    updateManifest(flight: string) {
        return this.http.get<any>(`${environment.apiClientUrl}/api/manifest/update/`+flight)
            .pipe(map(result => {
                return result.message;
            }));
    }

    searchPassenger(name: string, surname: string, seat: string) {
        let passenger = new Passenger();
        passenger.Name = name;
        passenger.Surname = surname;
        passenger.Surname = seat;

        return this.http.post<any>(`${environment.apiClientUrl}/api/manifest/search/`, { name, surname, seat })
            .pipe(map(passengers => {
                return JSON.stringify(passengers);
            }));
    }
}