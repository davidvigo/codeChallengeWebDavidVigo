import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { TranslateModule } from "@ngx-translate/core";
import { Observable, of } from "rxjs";
import { TransactionDto } from "../../../../shared/dto/transaction.dto";
import { getBaseUrl } from "../../../../shared/functions/setBaseUrl.function";
import { TransactionsRestService } from "../../../../shared/services/rest/transactions-rest.service";
import { TransactionsComponent } from './transactions.component';

describe('TransactionsComponent', () => {
    let component: TransactionsComponent;
    let fixture: ComponentFixture<TransactionsComponent>;
    let httpTestingController: HttpTestingController;
    let restService: TransactionsRestService;
    let httpResponse: Observable<HttpResponse<TransactionDto[]>> = of(new HttpResponse({
        body: [
            { id: 2000, date: new Date(), amount: 1000.00, fee: -10.00, description: "This is a mock", userId: 900 },
            { id: 2000, date: new Date(), amount: 1000.00, fee: -10.00, description: "This is a mock", userId: 900 },
        ]
    }));

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TransactionsComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([]),
                TranslateModule.forRoot(),
                HttpClientTestingModule
            ]
        })
            .compileComponents();

        httpTestingController = TestBed.inject(HttpTestingController);
        restService = TestBed.inject(TransactionsRestService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TransactionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form should be valid', () => {
        expect(component.filterForm.valid).toBeTruthy();
    });

    it('http service should be invoked on init and table data updated', () => {
        const restServiceSpy = spyOn(restService, 'get').and.returnValue(httpResponse);
        fixture = TestBed.createComponent(TransactionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(restServiceSpy).toHaveBeenCalled();
        expect(component.tableData.length).toEqual(2);
    });

    it('http service should be invoked on sort', () => {
        const restServiceSpy = spyOn(restService, 'get').and.returnValue(httpResponse);
        const sortOrder = component.sortAscending;
        component.sort();
        expect(restServiceSpy).toHaveBeenCalled();
        expect(component.tableData.length).toEqual(2);
        expect(component.sortAscending).not.toEqual(sortOrder);
    });

    it('when the form value changes, an http request should be performed', fakeAsync(() => {
        const restServiceSpy = spyOn(restService, 'get').and.returnValue(httpResponse);
        component.filterForm.controls.description.setValue('description');
        tick(400); // required due to debounceTime RxJs operator
        expect(restServiceSpy).toHaveBeenCalled();
        expect(component.tableData.length).toEqual(2);
    }));

    it('get method in restService should perform be a GET request with the right URL', () => {
        const req = httpTestingController.expectOne(getBaseUrl('/transactions?sort=desc'));
        expect(req.request.method).toEqual('GET');
    });
});
