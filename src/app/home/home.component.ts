import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@app/_services/api.service';
import { first } from 'rxjs/operators';
import { Passenger } from '@app/_model/passenger';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    apiRequestsForm: FormGroup;
    submitted = false;

    loading_getmanifest = false;
    error_getmanifest = '';
    success_getmanifest = '';
    
    loading_addpassenger = false;
    error_addpassenger = '';
    success_addpassenger = '';
    
    loading_updatemanifest = false;
    error_updatemanifest = '';
    success_updatemanifest = '';

    loading_searchpassenger = false;
    error_searchpassenger = '';
    success_searchpassenger = '';

    constructor(
        private formBuilder: FormBuilder,
        private apiService: ApiService
    ) {         
    }

    ngOnInit() {
        this.apiRequestsForm = this.formBuilder.group({
            flight: ['', Validators.required],
            passenger_name: ['', Validators.required],
            passenger_surname: ['', Validators.required],
            passenger_seat: ['', Validators.required],
            passenger_flight: ['', Validators.required],
            passenger_flight_client: ['', Validators.required],
            passenger_name_client: [''],
            passenger_surname_client: [''],
            passenger_seat_client: ['']
        });
    }

    get f() { return this.apiRequestsForm.controls; }

    getManifest() {

        this.loading_getmanifest = true;
        this.apiService.getManifest(this.f.flight.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.success_getmanifest = data;
                    this.error_getmanifest = '';
                    this.loading_getmanifest = false;
                },
                error => {
                    this.error_getmanifest = error;
                    this.success_getmanifest = '';
                    this.loading_getmanifest = false;
                });
    }

    addPassenger() {

        let passenger = new Passenger();
        passenger.Name = this.f.passenger_name.value;
        passenger.Surname = this.f.passenger_surname.value;
        passenger.Seat = this.f.passenger_seat.value;
        passenger.Flight = this.f.passenger_flight.value;

        this.loading_addpassenger = true;
        this.apiService.addPassenger(passenger.Name, passenger.Surname, passenger.Seat, passenger.Flight )
            .pipe(first())
            .subscribe(
                data => {
                    this.success_addpassenger = data.message;
                    this.error_addpassenger = '';
                    if (data.status=="KO") {
                        this.success_addpassenger = '';
                        this.error_addpassenger = data.message;
                    }
                    this.loading_addpassenger = false;
                },
                error => {
                    this.success_addpassenger = '';
                    this.error_addpassenger = error.message;
                    this.loading_addpassenger = false;
                });
    }

    updateManifest() {

        this.loading_updatemanifest = true;
        this.apiService.updateManifest(this.f.passenger_flight_client.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.success_updatemanifest = data;
                    this.error_updatemanifest = '';
                    this.loading_updatemanifest = false;
                },
                error => {
                    this.error_updatemanifest = error;
                    this.success_updatemanifest = '';
                    this.loading_updatemanifest = false;
                });
    }

    searchPassenger() {

        this.loading_searchpassenger = true;
        this.apiService.searchPassenger(this.f.passenger_name_client.value, 
                                            this.f.passenger_surname_client.value, 
                                            this.f.passenger_seat_client.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.success_searchpassenger = data;
                    this.error_searchpassenger = '';
                    this.loading_searchpassenger = false;
                },
                error => {
                    this.error_searchpassenger = error;
                    this.success_searchpassenger = '';
                    this.loading_searchpassenger = false;
                });
    }
}