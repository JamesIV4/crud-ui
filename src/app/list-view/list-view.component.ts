import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DatabaseService, User } from "../database.service";

@Component({
    selector: 'app-list-view',
    templateUrl: './list-view.component.html',
    styleUrls: ['./list-view.component.scss']
})

export class ListViewComponent implements OnInit {
    displayedColumns: string[] = ['id', 'avatar', 'name', 'email', 'dob'];

    constructor(public database: DatabaseService) {}

    @ViewChild(MatTable) table: MatTable<User>;

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
    }

    refreshTable() {
        this.table.renderRows();
    }

    convertDate(_date: string) {
        const date = new Date(_date);
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
    }

    onChangePage(pageEvent: PageEvent) {
        console.log(pageEvent.pageIndex);
        console.log(pageEvent.pageSize);
        
        this.database.pageNum = pageEvent.pageIndex + 1;
        this.database.pageSize = pageEvent.pageSize;
        this.database.fetchData();
    }

    sortData(sort: Sort) {
        console.log(sort);

        if (sort.direction === '') {
            this.database.sort.sorting = false;
        } else {
            this.database.sort.sorting = true;
            this.database.sort.id = sort.active;
            this.database.sort.direction = sort.direction;
        }

        this.database.fetchData();
    }
}