import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { of } from "rxjs";
import { getBaseUrl } from "../../../shared/functions/setBaseUrl.function";
import { AuthRestService } from "../../../shared/services/rest/auth-rest.service";
import { SessionService } from "../../../shared/services/session.service";

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;
    let httpTestingController: HttpTestingController;
    let restService: AuthRestService;
    let routerSpy = { navigate: jasmine.createSpy('navigate') };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuthComponent],
            providers: [{ provide: Router, useValue: routerSpy }],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                TranslateModule.forRoot(),
                HttpClientTestingModule
            ]
        })
            .compileComponents();

        httpTestingController = TestBed.inject(HttpTestingController);
        restService = TestBed.inject(AuthRestService);

        TestBed.inject(SessionService);
        let store: any = {};
        const mockLocalStorage = {
            setItem: (key: string, value: string) => store[key] = `${ value }`,
            getItem: (key: string): string => key in store ? store[key] : null,
        };
        spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
        spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);

        routerSpy.navigate.calls.reset();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form should be invalid if its fields are empty', () => {
        expect(component.formGroup.controls.user.invalid).toBeTruthy();
        expect(component.formGroup.controls.password.invalid).toBeTruthy()
    });

    it('form should be valid if its fields are filled', () => {
        component.formGroup.patchValue({ user: 'user', password: 'pass' });
        expect(component.formGroup.controls.user.valid).toBeTruthy();
        expect(component.formGroup.controls.password.valid).toBeTruthy()
    });

    it('no http request should be done if the form is invalid and the submit method is invoked', () => {
        const httpResponse = of(new HttpResponse({ body: { accessToken: 'token' } }));
        const restServiceSpy = spyOn(restService, 'login').and.returnValue(httpResponse);
        component.submit();
        expect(restServiceSpy).not.toHaveBeenCalled();
        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should do an http request, set accessToken in localstorage and navigate to home page if the form is valid and the submit method is invoked', () => {
        component.formGroup.patchValue({ user: 'user', password: 'pass' });
        const httpResponse = of(new HttpResponse({ body: { accessToken: 'token' } }));
        const restServiceSpy = spyOn(restService, 'login').and.returnValue(httpResponse);
        component.submit();
        expect(restServiceSpy).toHaveBeenCalled();
        expect(!!localStorage.getItem('accessToken')).toBeTruthy();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('login method in restService should perform be a POST request with the right URL', () => {
        restService.login({ username: 'user', password: 'pass' }).subscribe();
        const req = httpTestingController.expectOne(getBaseUrl('/token'));
        expect(req.request.method).toEqual('POST');
    });
});
