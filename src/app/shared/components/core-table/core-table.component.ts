import { CdkColumnDef, CdkTable } from '@angular/cdk/table';
import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, ViewChild } from '@angular/core';

@Component({
    selector: 'app-core-table',
    templateUrl: './core-table.component.html',
    styleUrls: ['./core-table.component.scss']
})
export class CoreTableComponent implements OnInit, AfterContentInit {
    @ViewChild(CdkTable, {static: true}) cdkTable: CdkTable<any>;
    @ContentChildren(CdkColumnDef) columnDefs: QueryList<CdkColumnDef>;
    @Input() dataSource: any[];
    @Input() columns: any[];

    colDefs: string[];

    ngOnInit(): void {
        this.colDefs = this.columns.map(c => c.columnDef);
    }

    ngAfterContentInit(): void {
        this.columnDefs.forEach(columnDef => this.cdkTable.addColumnDef(columnDef));
    }
}
