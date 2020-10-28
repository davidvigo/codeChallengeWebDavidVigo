import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { finalize } from "rxjs/operators";
import { AuthResponseDto } from "../../../shared/dto/authResponse.dto";
import { AlertsService } from "../../../shared/services/alerts.service";
import { AuthRestService } from "../../../shared/services/rest/auth-rest.service";
import { SessionService } from "../../../shared/services/session.service";
import { SpinnerService } from "../../../shared/services/spinner.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
    @ViewChild('ngForm') ngForm: NgForm;
    formGroup: FormGroup;
    hidePassword = true;

    readonly alertChannel = 'authAlerts';
    readonly faEyeSlash = faEyeSlash;
    readonly faEye = faEye;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private alertsService: AlertsService,
        private restService: AuthRestService,
        private spinnerService: SpinnerService
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnDestroy(): void {
        this.alertsService.closeAll(this.alertChannel);
    }

    submit(): void {
        if (this.formGroup.valid) {
            this.spinnerService.showSpinner();
            this.alertsService.removeAlert(this.alertChannel, 'auth.error.incorrectCredentials');
            const authData = { username: this.formGroup.value.user, password: this.formGroup.value.password };
            this.restService.login(authData)
                .pipe(finalize(() => this.spinnerService.hideSpinner()))
                .subscribe(this.handleLoginSuccess, this.handleLoginError);
        } else {
            this.ngForm.onSubmit(undefined); // displays validation errors
        }
    }

    private handleLoginSuccess = (response: HttpResponse<AuthResponseDto>): void => {
        if (response.body && response.body.accessToken) {
            SessionService.startSession(response.body.accessToken);
            this.router.navigate(['/home']);
        }
    };

    private handleLoginError = (error: HttpErrorResponse): void => {
        if (error.status === 401) {
            this.alertsService.addAlert(this.alertChannel, {
                type: 'danger',
                closable: true,
                messageKey: 'auth.error.incorrectCredentials'
            })
        }
    };

    private initForm(): void {
        this.formGroup = this.fb.group({
            user: [null, [Validators.required]],
            password: [null, [Validators.required]]
        });
    }
}
