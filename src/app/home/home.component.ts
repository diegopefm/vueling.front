import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@app/_services/api.service';
import { first } from 'rxjs/operators';
import { Passenger } from '@app/_model/passenger';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    apiRequestsForm: FormGroup;
    loading_getmanifest = false;
    loading_addpassenger = false;
    submitted = false;
    error_getmanifest = '';
    success_getmanifest = '';
    error_addpassenger = '';
    success_addpassenger = '';

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
            passenger_flight: ['', Validators.required]
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
                    this.success_addpassenger = data;
                    this.error_addpassenger = '';
                    this.loading_addpassenger = false;
                },
                error => {
                    this.error_addpassenger = error;
                    this.success_addpassenger = '';
                    this.loading_addpassenger = false;
                });
    }
}