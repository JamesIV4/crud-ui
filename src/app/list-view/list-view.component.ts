import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material/table';
import { DatabaseService, User } from "../database.service";

@Component({
    selector: 'app-list-view',
    templateUrl: './list-view.component.html',
    styleUrls: ['./list-view.component.scss']
})

export class ListViewComponent implements OnInit {
    displayedColumns: string[] = ['id', 'avatar', 'name', 'email', 'dob'];
    dataSource = new MatTableDataSource(this.database.localData);

    constructor(public database: DatabaseService) {}

    @ViewChild(MatTable) table: MatTable<User>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit() {
        this.database.fetchData()
    }

    addData() {
        //const randomIndex = Math.floor(Math.random() * this.dataSource.length);
        //this.dataSource.push(this.dataSource[randomIndex]);
        this.table.renderRows();
    }

    removeData() {
        //this.dataSource.pop();
        this.table.renderRows();
    }

    logData() {
        console.log(this.database.localData);
        console.log(this.dataSource);
    }

    refreshTable() {
        this.table.renderRows();
    }

    convertDate(_date: string) {
        const date = new Date(_date);
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
    }
}