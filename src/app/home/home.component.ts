import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@app/_services/api.service';
import { first } from 'rxjs/operators';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    apiRequestsForm: FormGroup;
    loading = false;
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

        this.loading = true;
        this.apiService.getManifest(this.f.flight.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.success_getmanifest = data;
                    this.loading = false;
                },
                error => {
                    this.error_getmanifest = error;
                    this.loading = false;
                });
    }
}