import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from "@angular/router";
import { SessionService } from "../../../shared/services/session.service";
import { MainComponent } from './main.component';

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;
    let routerSpy = { navigate: jasmine.createSpy('navigate') };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MainComponent],
            providers: [{ provide: Router, useValue: routerSpy }]
        })
            .compileComponents();

        TestBed.inject(SessionService);
        let store: any = { accessToken: 'accessToken' };
        const mockLocalStorage = {
            getItem: (key: string): string => key in store ? store[key] : null,
            clear: () => store = {}
        };
        spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
        spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);

        routerSpy.navigate.calls.reset();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should clear localStorage and navigate to login page if logout method is invoked', () => {
        component.logout();
        expect(!!localStorage.getItem('accessToken')).toBeFalsy();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
});
