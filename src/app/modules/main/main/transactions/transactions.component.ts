import { HttpResponse } from "@angular/common/http";
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, finalize, switchMap, takeUntil } from "rxjs/operators";
import { CdkTableContentDef } from "../../../../shared/components/core-table/CdkTableContentDef";
import { TransactionDto } from "../../../../shared/dto/transaction.dto";
import { AlertsService } from "../../../../shared/services/alerts.service";
import { TransactionsRestService } from "../../../../shared/services/rest/transactions-rest.service";
import { SpinnerService } from "../../../../shared/services/spinner.service";

interface CdkTransactionTableDef extends CdkTableContentDef {
    fixWidth?: string;
    alignRight?: boolean
}

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
    @ViewChild('alertTemplate') alertTemplate: ElementRef<any>;
    filterForm: FormGroup;
    sortAscending = false; // default sort value (sort only possible by date)
    tableData: TransactionDto[] = [];

    readonly alertChannel = 'transactionAlerts';
    readonly sortUpIcon = faSortUp;
    readonly sortDownIcon = faSortDown;

    readonly columnDefs: CdkTransactionTableDef[] = [
        { columnDef: 'id', header: 'transactions.label.id', propName: 'id' },
        { columnDef: 'date', header: 'transactions.label.date', propName: 'date' },
        { columnDef: 'amount', header: 'transactions.label.amount', propName: 'amount', alignRight: true },
        { columnDef: 'fee', header: 'transactions.label.fee', propName: 'fee', alignRight: true },
        { columnDef: 'description', header: 'transactions.label.description', propName: 'description' },
        { columnDef: 'userId', header: 'transactions.label.userId', propName: 'userId' },
    ];


    private unsubscribe$ = new Subject();

    constructor(
        private fb: FormBuilder,
        private alertsService: AlertsService,
        private spinnerService: SpinnerService,
        private restService: TransactionsRestService
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.getData().subscribe(this.setTableData);
    }

    ngOnDestroy(): void {
        this.alertsService.closeAll(this.alertChannel);
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    sort(): void {
        this.sortAscending = !this.sortAscending;
        this.getData().subscribe(this.setTableData);
    }

    private initForm(): void {
        this.filterForm = this.fb.group({
            description: null // filter only possible by description
        });
        this.filterForm.controls.description.valueChanges
            .pipe(
                distinctUntilChanged(),
                debounceTime(350),
                switchMap(() => this.getData()),
                takeUntil(this.unsubscribe$)
            )
            .subscribe(this.setTableData);
    }

    private getData(): Observable<HttpResponse<TransactionDto[]>> {
        this.spinnerService.showSpinner();
        return this.restService.get(!!this.sortAscending ? 'asc' : 'desc', this.filterForm.controls.description.value)
            .pipe(finalize(() => this.spinnerService.hideSpinner()))
    }

    private setTableData = (response: HttpResponse<TransactionDto[]>): void => {
        if (!!response.body) {
            this.tableData = response.body;
            this.alertsService.closeAll(this.alertChannel);
            if (!response.body.length) {
                this.alertsService.addAlert(this.alertChannel, { type: 'warning', closable: false, messageKey: 'transactions.label.noDataFound' });
            }
        }
    };
}
